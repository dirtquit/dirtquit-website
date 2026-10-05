import urllib.request
import re

BASE = "http://localhost:4000"
home_html = urllib.request.urlopen(f"{BASE}/").read().decode("utf-8")

# Extract only the #services section
services_section = re.search(r'<section id="services".*?</section>', home_html, re.DOTALL)
if not services_section:
    print("Could not find #services section in homepage!")
    exit(1)
services_html = services_section.group(0)

CATEGORIES = [
    "home-cleaning", "deep-cleaning", "apartment-cleaning", "bathroom-cleaning",
    "kitchen-cleaning", "sofa-cleaning", "carpet-cleaning", "mattress-cleaning",
    "floor-cleaning", "window-cleaning", "move-in-move-out-cleaning", "office-cleaning",
    "post-construction-cleaning", "balcony-cleaning", "appliance-cleaning",
    "regular-home-cleaning", "specialized-cleaning"
]

print("Verifying exact match between homepage card image and category hero image:")
all_pass = True
for slug in CATEGORIES:
    card_pattern = rf'<a[^>]+href=["\']/bangalore/{slug}/["\'][^>]*>.*?<img[^>]+src=["\']([^"\']+)["\']'
    m_home = re.search(card_pattern, services_html, re.DOTALL)
    home_src = m_home.group(1) if m_home else "NOT_FOUND"

    cat_html = urllib.request.urlopen(f"{BASE}/bangalore/{slug}/").read().decode("utf-8")
    cat_imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', cat_html)
    non_logo_imgs = [i for i in cat_imgs if "logo" not in i]
    hero_src = non_logo_imgs[0] if non_logo_imgs else "NOT_FOUND"

    if home_src == hero_src:
        print(f"[PASS] {slug:26} -> {home_src.split('/')[-1]}")
    else:
        print(f"[MISMATCH] {slug:26} -> home: {home_src} | hero: {hero_src}")
        all_pass = False

if all_pass:
    print("\nALL 17 CATEGORIES: Homepage card image and Category hero image match EXACTLY 1:1!")
