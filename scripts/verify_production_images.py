import urllib.request
import re
import sys
import os

BASE_URL = "http://localhost:4000"

CATEGORIES = [
    "home-cleaning",
    "deep-cleaning",
    "apartment-cleaning",
    "bathroom-cleaning",
    "kitchen-cleaning",
    "sofa-cleaning",
    "carpet-cleaning",
    "mattress-cleaning",
    "floor-cleaning",
    "window-cleaning",
    "move-in-move-out-cleaning",
    "office-cleaning",
    "post-construction-cleaning",
    "balcony-cleaning",
    "appliance-cleaning",
    "regular-home-cleaning",
    "specialized-cleaning",
]

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "DirtQuitVerifier/1.0"})
    res = urllib.request.urlopen(req, timeout=10)
    return res.status, res.headers.get("Content-Type", ""), res.read().decode("utf-8", errors="replace")

def head_url(url):
    req = urllib.request.Request(url, headers={"User-Agent": "DirtQuitVerifier/1.0"})
    res = urllib.request.urlopen(req, timeout=10)
    return res.status, res.headers.get("Content-Type", "")

def main():
    print("=== STARTING EXHAUSTIVE PRODUCTION VERIFICATION ===")
    errors = []

    # 1. Check Homepage
    print("\n1. Verifying Homepage (/) ...")
    status, ctype, html = fetch(f"{BASE_URL}/")
    if status != 200:
        errors.append(f"Homepage returned status {status}")
    
    # Check for external images
    ext_imgs = re.findall(r'<img[^>]+src=["\'](https?://[^"\']+)["\']', html)
    for ext in ext_imgs:
        if "dirtquit.info" not in ext and "localhost" not in ext:
            errors.append(f"Homepage contains external image: {ext}")
    print(f" -> Homepage external images: {len([e for e in ext_imgs if 'dirtquit.info' not in e and 'localhost' not in e])}")

    # Find all card images on homepage
    card_img_srcs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
    print(f" -> Total images found on homepage: {len(card_img_srcs)}")
    for src in card_img_srcs:
        full_url = src if src.startswith("http") else f"{BASE_URL}{src}"
        try:
            istatus, ictype = head_url(full_url)
            if istatus != 200 or not ictype.startswith("image/"):
                errors.append(f"Homepage image failed: {full_url} -> status {istatus}, type {ictype}")
        except Exception as e:
            errors.append(f"Homepage image exception {full_url}: {e}")

    # 2. Check Bangalore Hub Page (/bangalore/)
    print("\n2. Verifying City Hub (/bangalore/) ...")
    status, ctype, hub_html = fetch(f"{BASE_URL}/bangalore/")
    if status != 200:
        errors.append(f"Bangalore hub returned status {status}")
    hub_imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', hub_html)
    print(f" -> Total images found on Bangalore hub: {len(hub_imgs)}")
    for src in hub_imgs:
        full_url = src if src.startswith("http") else f"{BASE_URL}{src}"
        try:
            istatus, ictype = head_url(full_url)
            if istatus != 200 or not ictype.startswith("image/"):
                errors.append(f"Bangalore hub image failed: {full_url} -> status {istatus}, type {ictype}")
        except Exception as e:
            errors.append(f"Bangalore hub image exception {full_url}: {e}")

    # 3. Check All 17 Category Pages
    print("\n3. Verifying All 17 Category Pages ...")
    cat_summary = []
    for slug in CATEGORIES:
        page_url = f"{BASE_URL}/bangalore/{slug}/"
        p_status, _, p_html = fetch(page_url)
        if p_status != 200:
            errors.append(f"Category page {slug} returned status {p_status}")
            continue

        # Extract og:image
        og_match = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', p_html)
        tw_match = re.search(r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)["\']', p_html)
        
        if not og_match:
            errors.append(f"[{slug}] Missing og:image")
            og_url = None
        else:
            og_url = og_match.group(1)

        if not tw_match:
            errors.append(f"[{slug}] Missing twitter:image")

        # Test OG image
        if og_url:
            local_og = og_url.replace("https://www.dirtquit.info", BASE_URL)
            try:
                ostatus, octype = head_url(local_og)
                if ostatus != 200 or not octype.startswith("image/"):
                    errors.append(f"[{slug}] og:image failed: {local_og} -> {ostatus} ({octype})")
            except Exception as e:
                errors.append(f"[{slug}] og:image exception {local_og}: {e}")

        # Check Service schema image
        schema_match = re.search(r'"@type":\s*"Service".*?"image":\s*"([^"]+)"', p_html, re.DOTALL)
        if not schema_match:
            errors.append(f"[{slug}] Missing Service schema image")
        else:
            s_img = schema_match.group(1).replace("https://www.dirtquit.info", BASE_URL)
            try:
                sstatus, sctype = head_url(s_img)
                if sstatus != 200 or not sctype.startswith("image/"):
                    errors.append(f"[{slug}] Service schema image failed: {s_img} -> {sstatus} ({sctype})")
            except Exception as e:
                errors.append(f"[{slug}] Service schema image exception {s_img}: {e}")

        # Extract all images on the category page
        cat_imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', p_html)
        for c_src in cat_imgs:
            if "logo" in c_src: continue
            c_url = c_src if c_src.startswith("http") else f"{BASE_URL}{c_src}"
            try:
                cstatus, cctype = head_url(c_url)
                if cstatus != 200:
                    errors.append(f"[{slug}] Image on page failed: {c_url} -> {cstatus}")
            except Exception as e:
                errors.append(f"[{slug}] Image exception {c_url}: {e}")

        cat_summary.append({
            "slug": slug,
            "status": p_status,
            "og_url": og_url,
            "img_count": len(cat_imgs)
        })
        print(f" -> [{slug:26}] PASS (Status 200, {len(cat_imgs)} images, OG: {og_url})")

    # 4. Check Dev Image Review
    print("\n4. Verifying /dev/image-review ...")
    r_status, _, r_html = fetch(f"{BASE_URL}/dev/image-review")
    if r_status != 200:
        errors.append(f"/dev/image-review returned status {r_status}")
    else:
        has_noindex = 'content="noindex' in r_html or 'content="noindex, nofollow"' in r_html
        if not has_noindex:
            errors.append("/dev/image-review missing robots noindex")
        else:
            print(" -> /dev/image-review PASS (Status 200, robots: noindex verified)")

    print("\n=== VERIFICATION RESULT ===")
    if errors:
        print(f"FAILED with {len(errors)} errors:")
        for err in errors:
            print(f"  ❌ {err}")
        sys.exit(1)
    else:
        print("ALL CHECKS PASSED PERFECTLY! 100% SUCCESS!")

if __name__ == "__main__":
    main()
