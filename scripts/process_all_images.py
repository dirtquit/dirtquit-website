import os
import urllib.request
import io
from PIL import Image

def get_image(url_or_path):
    if url_or_path.startswith("http"):
        req = urllib.request.Request(url_or_path, headers={"User-Agent": "Mozilla/5.0"})
        data = urllib.request.urlopen(req, timeout=15).read()
        return Image.open(io.BytesIO(data))
    else:
        return Image.open(url_or_path)

def crop_to_aspect(im, target_w, target_h):
    im = im.convert("RGB")
    target_ratio = target_w / target_h
    w, h = im.size
    current_ratio = w / h
    if current_ratio > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        crop_box = (left, 0, left + new_w, h)
    else:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        crop_box = (0, top, w, top + new_h)
    return im.crop(crop_box).resize((target_w, target_h), Image.Resampling.LANCZOS)

def process_category(slug, hero_src, detail_src, context_src, is_native_1024=False):
    out_dir = os.path.join("src", "assets", "categories", slug)
    os.makedirs(out_dir, exist_ok=True)
    
    # 1. Hero
    im_hero = get_image(hero_src)
    if is_native_1024:
        hero_w, hero_h = 1024, 768
    else:
        hero_w, hero_h = 1200, 900
    hero_img = crop_to_aspect(im_hero, hero_w, hero_h)
    hero_file = f"{slug}-bengaluru-hero.webp"
    hero_img.save(os.path.join(out_dir, hero_file), "WEBP", quality=82)
    
    # Hero 800w
    h800 = hero_img.resize((800, int(800 * hero_h / hero_w)), Image.Resampling.LANCZOS)
    h800.save(os.path.join(out_dir, f"{slug}-bengaluru-hero-800.webp"), "WEBP", quality=80)
    
    # Hero 480w
    h480 = hero_img.resize((480, int(480 * hero_h / hero_w)), Image.Resampling.LANCZOS)
    h480.save(os.path.join(out_dir, f"{slug}-bengaluru-hero-480.webp"), "WEBP", quality=80)
    
    # 2. Detail (800x600)
    im_detail = get_image(detail_src)
    detail_img = crop_to_aspect(im_detail, 800, 600)
    detail_file = f"{slug}-bengaluru-detail.webp"
    detail_img.save(os.path.join(out_dir, detail_file), "WEBP", quality=82)
    
    # 3. Context (800x600)
    im_context = get_image(context_src)
    context_img = crop_to_aspect(im_context, 800, 600)
    context_file = f"{slug}-bengaluru-context.webp"
    context_img.save(os.path.join(out_dir, context_file), "WEBP", quality=82)
    
    # 4. OG Image (1200x630 JPEG)
    og_img = crop_to_aspect(im_hero, 1200, 630)
    og_file = f"{slug}-bengaluru-og.jpg"
    og_img.save(os.path.join(out_dir, og_file), "JPEG", quality=85)
    
    # Calculate sizes
    s_hero = os.path.getsize(os.path.join(out_dir, hero_file))
    s_detail = os.path.getsize(os.path.join(out_dir, detail_file))
    s_context = os.path.getsize(os.path.join(out_dir, context_file))
    s_og = os.path.getsize(os.path.join(out_dir, og_file))
    tot = (s_hero + s_detail + s_context) / 1024
    print(f"Processed {slug:28} | Hero: {s_hero/1024:.1f}KB, Detail: {s_detail/1024:.1f}KB, Context: {s_context/1024:.1f}KB, Total Page Weight: {tot:.1f}KB (ceiling: 400KB)")

print("Script template ready.")
