import os
import urllib.request
import io
import time
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATEGORIES_DIR = os.path.join(BASE_DIR, "src", "assets", "categories")

# Headers for downloading
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
}

def fetch_img(src):
    if src.startswith("http"):
        for attempt in range(4):
            try:
                req = urllib.request.Request(src, headers=HEADERS)
                data = urllib.request.urlopen(req, timeout=25).read()
                return Image.open(io.BytesIO(data))
            except Exception as e:
                print(f"  Attempt {attempt + 1} failed for {src}: {e}")
                time.sleep(2 * (attempt + 1))
        raise RuntimeError(f"Failed to fetch {src} after 4 attempts")
    else:
        abs_path = os.path.join(BASE_DIR, src) if not os.path.isabs(src) else src
        return Image.open(abs_path)

def crop_box(im, target_w, target_h, focus="center"):
    im = im.convert("RGB")
    target_ratio = target_w / target_h
    w, h = im.size
    cur_ratio = w / h
    
    if cur_ratio > target_ratio:
        new_w = int(h * target_ratio)
        if focus == "left":
            left = 0
        elif focus == "right":
            left = w - new_w
        else:
            left = (w - new_w) // 2
        box = (left, 0, left + new_w, h)
    else:
        new_h = int(w / target_ratio)
        if focus == "top":
            top = 0
        elif focus == "bottom":
            top = h - new_h
        else:
            top = (h - new_h) // 2
        box = (0, top, w, top + new_h)
    
    return im.crop(box).resize((target_w, target_h), Image.Resampling.LANCZOS)

def macro_crop(im, target_w, target_h, region="center_tight"):
    im = im.convert("RGB")
    w, h = im.size
    # A tight crop representing 40-50% of the image to show close-up material details
    if region == "bottom_center":
        # e.g. floor or low surface
        crop_w = int(w * 0.5)
        crop_h = int(crop_w * (target_h / target_w))
        left = (w - crop_w) // 2
        top = h - crop_h - int(h * 0.1)
    elif region == "top_left":
        crop_w = int(w * 0.5)
        crop_h = int(crop_w * (target_h / target_w))
        left = int(w * 0.1)
        top = int(h * 0.1)
    elif region == "center_tight":
        crop_w = int(w * 0.45)
        crop_h = int(crop_w * (target_h / target_w))
        left = (w - crop_w) // 2
        top = (h - crop_h) // 2
    else:
        return crop_box(im, target_w, target_h, "center")
    
    # clamp
    left = max(0, min(left, w - crop_w))
    top = max(0, min(top, h - crop_h))
    return im.crop((left, top, left + crop_w, top + crop_h)).resize((target_w, target_h), Image.Resampling.LANCZOS)

# Config for all 17 categories
CONFIGS = [
    # 1. home-cleaning
    {
        "slug": "home-cleaning",
        "hero_src": "src/assets/hero-cleaner.jpg",
        "detail_src": "src/assets/hero-cleaner.jpg",
        "context_src": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": False,
        "detail_macro": "center_tight",
        "alt_hero": "Professional cleaner in uniform cleaning modern apartment interior",
        "alt_detail": "Microfiber cleaning cloth and cleaning solution bottle on surface",
        "alt_context": "Spacious and bright modern home living room with natural sunlight",
    },
    # 2. deep-cleaning
    {
        "slug": "deep-cleaning",
        "hero_src": r"C:\Users\JOHNBOSCO\.gemini\antigravity\brain\30ac846b-077f-4aaa-a1ca-ea8dedbe76f2\deep_hero_1791229175208.jpg",
        "detail_src": r"C:\Users\JOHNBOSCO\.gemini\antigravity\brain\30ac846b-077f-4aaa-a1ca-ea8dedbe76f2\deep_hero_1791229175208.jpg",
        "context_src": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": False,
        "detail_macro": "bottom_center",
        "alt_hero": "Spotless modern apartment living room with polished vitrified tile floor",
        "alt_detail": "Clean polished living room tile floor reflecting ambient light",
        "alt_context": "Organized living space with clean seating and bright sliding window",
    },
    # 3. apartment-cleaning
    {
        "slug": "apartment-cleaning",
        "hero_src": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
        "detail_src": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
        "context_src": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": False,
        "detail_macro": "center_tight",
        "alt_hero": "Sunlit modern apartment living hall with sofa and wooden floor",
        "alt_detail": "Clean floor edge and wall baseboard in sunny apartment room",
        "alt_context": "Modern apartment residential building view under clear sky",
    },
    # 4. bathroom-cleaning
    {
        "slug": "bathroom-cleaning",
        "hero_src": "src/assets/bath-after.jpg",
        "detail_src": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
        "context_src": "src/assets/bath-after.jpg",
        "is_native_1024": True, # flagged < 1200w (1024x768)
        "detail_macro": "center",
        "alt_hero": "Clean bathroom with ceramic wall tiles, mirror, and white commode",
        "alt_detail": "Polished chrome bathroom mixer faucet and clean white ceramic sink basin",
        "alt_context": "Bright modern bathroom washroom with glass partition and wall tiles",
    },
    # 5. kitchen-cleaning -> already done!
    # 6. sofa-cleaning
    {
        "slug": "sofa-cleaning",
        "hero_src": "src/assets/sofa-after.jpg",
        "detail_src": "src/assets/sofa-after.jpg",
        "context_src": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": True, # flagged < 1200w (1024x768)
        "detail_macro": "center_tight",
        "alt_hero": "Clean fabric sectional sofa with cushions in bright living room",
        "alt_detail": "Clean woven upholstery fabric weave and cushion seam detail",
        "alt_context": "Comfortable furnished living room with clean sofa seating area",
    },
    # 7. carpet-cleaning
    {
        "slug": "carpet-cleaning",
        "hero_src": "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=80",
        "detail_src": "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=80",
        "context_src": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": False,
        "detail_macro": "bottom_center",
        "alt_hero": "Clean modern living room with patterned area rug on floor",
        "alt_detail": "Close-up of clean woven carpet fibers and detailed border pattern",
        "alt_context": "Warm living room interior with clean rug centered under coffee table",
    },
    # 8. mattress-cleaning
    {
        "slug": "mattress-cleaning",
        "hero_src": "https://images.unsplash.com/photo-1579664531470-ac357f8f8e2b?auto=format&fit=crop&w=1600&q=80",
        "detail_src": "https://images.unsplash.com/photo-1579664531470-ac357f8f8e2b?auto=format&fit=crop&w=1600&q=80",
        "context_src": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": False,
        "detail_macro": "center_tight",
        "alt_hero": "Clean mattress and neat white bed linens in a modern bedroom",
        "alt_detail": "Close-up of clean quilted white mattress top fabric and stitched pattern",
        "alt_context": "Spacious bedroom with neatly made bed, headboard, and bedside lighting",
    },
    # 9. floor-cleaning
    {
        "slug": "floor-cleaning",
        "hero_src": "https://images.unsplash.com/photo-1599031628962-1f6755a3b1b5?auto=format&fit=crop&w=1600&q=80",
        "detail_src": "https://images.unsplash.com/photo-1599031628962-1f6755a3b1b5?auto=format&fit=crop&w=1600&q=80",
        "context_src": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": False,
        "detail_macro": "center_tight",
        "alt_hero": "Clean polished ceramic tile floor with neat grout seams",
        "alt_detail": "Close-up of clean vitrified tile grout line and polished surface",
        "alt_context": "Bright apartment hallway with clean floor reflecting natural daylight",
    },
    # 10. window-cleaning
    {
        "slug": "window-cleaning",
        "hero_src": "https://images.unsplash.com/photo-1527515545081-5db817172677?auto=format&fit=crop&w=1600&q=80",
        "detail_src": "https://images.unsplash.com/photo-1527515545081-5db817172677?auto=format&fit=crop&w=1600&q=80",
        "context_src": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": False,
        "detail_macro": "center_tight",
        "alt_hero": "Clean transparent glass window overlooking outdoor trees and daylight",
        "alt_detail": "Clear glass window pane and metal frame joint free of dust",
        "alt_context": "Sunlit interior room with large clean glass windows providing natural light",
    },
    # 11. move-in-move-out-cleaning
    {
        "slug": "move-in-move-out-cleaning",
        "hero_src": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
        "detail_src": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
        "context_src": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": False,
        "detail_macro": "bottom_center",
        "alt_hero": "Empty clean apartment room with spotless floor and white walls ready for move-in",
        "alt_detail": "Clean empty apartment room corner and baseboard in bright morning light",
        "alt_context": "Move-in ready empty residential space with polished flooring and clear windows",
    },
    # 12. office-cleaning
    {
        "slug": "office-cleaning",
        "hero_src": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        "detail_src": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        "context_src": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": False,
        "detail_macro": "center_tight",
        "alt_hero": "Modern commercial office interior with clean desks and ergonomic chairs",
        "alt_detail": "Clean workstation desk surface, keyboard area, and organized office supplies",
        "alt_context": "Open-plan corporate office workspace with clean partition screens and lighting",
    },
    # 13. post-construction-cleaning
    {
        "slug": "post-construction-cleaning",
        "hero_src": "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1600&q=80",
        "detail_src": "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1600&q=80",
        "context_src": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": False,
        "detail_macro": "bottom_center",
        "alt_hero": "Freshly renovated apartment interior with clean walls and newly laid floor",
        "alt_detail": "Clean newly installed architectural trim and baseboard after renovation",
        "alt_context": "Renovated bright living space free of construction dust and debris",
    },
    # 14. balcony-cleaning
    {
        "slug": "balcony-cleaning",
        "hero_src": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
        "detail_src": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
        "context_src": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": False,
        "detail_macro": "center_tight",
        "alt_hero": "Clean apartment balcony with potted green plants and outdoor floor",
        "alt_detail": "Clean balcony floor tiles and balcony railing detail in daylight",
        "alt_context": "Exterior apartment building facade showing clean outdoor balcony ledges",
    },
    # 15. appliance-cleaning
    {
        "slug": "appliance-cleaning",
        "hero_src": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1600&q=80",
        "detail_src": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1600&q=80",
        "context_src": "src/assets/kitchen-after.jpg",
        "is_native_1024": False,
        "detail_macro": "center_tight",
        "alt_hero": "Modern kitchen with stainless steel refrigerator and clean microwave oven",
        "alt_detail": "Clean exterior surface and handle of kitchen appliance",
        "alt_context": "Modular kitchen setup with clean integrated household appliances",
    },
    # 16. regular-home-cleaning
    {
        "slug": "regular-home-cleaning",
        "hero_src": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=80",
        "detail_src": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=80",
        "context_src": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": False,
        "detail_macro": "center_tight",
        "alt_hero": "Tidy everyday apartment living room with organized furniture and natural light",
        "alt_detail": "Clean organized coffee table top and decorative accents in living room",
        "alt_context": "Well-kept apartment living space maintained for routine daily living",
    },
    # 17. specialized-cleaning
    {
        "slug": "specialized-cleaning",
        "hero_src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
        "detail_src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
        "context_src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
        "is_native_1024": False,
        "detail_macro": "bottom_center",
        "alt_hero": "Clean spacious dance and yoga fitness studio with polished floor and wall mirrors",
        "alt_detail": "Clean polished wooden studio floor reflecting natural ambient light",
        "alt_context": "Specialized fitness studio room with clean floor and open exercise space",
    }
]

def main():
    print(f"Starting asset generation for {len(CONFIGS)} categories...")
    results = []
    
    for cfg in CONFIGS:
        slug = cfg["slug"]
        print(f"\nProcessing [{slug}]...")
        out_dir = os.path.join(CATEGORIES_DIR, slug)
        os.makedirs(out_dir, exist_ok=True)
        
        # Hero
        im_hero = fetch_img(cfg["hero_src"])
        if cfg["is_native_1024"]:
            hw, hh = 1024, 768
        else:
            hw, hh = 1200, 900
        hero_img = crop_box(im_hero, hw, hh, "center")
        hero_path = os.path.join(out_dir, f"{slug}-bengaluru-hero.webp")
        hero_img.save(hero_path, "WEBP", quality=82)
        
        # Responsive 800w & 480w
        h800 = hero_img.resize((800, int(800 * hh / hw)), Image.Resampling.LANCZOS)
        h800.save(os.path.join(out_dir, f"{slug}-bengaluru-hero-800.webp"), "WEBP", quality=80)
        h480 = hero_img.resize((480, int(480 * hh / hw)), Image.Resampling.LANCZOS)
        h480.save(os.path.join(out_dir, f"{slug}-bengaluru-hero-480.webp"), "WEBP", quality=80)
        
        # Detail (800x600)
        im_detail_raw = fetch_img(cfg["detail_src"])
        macro_type = cfg.get("detail_macro", "center_tight")
        detail_img = macro_crop(im_detail_raw, 800, 600, macro_type)
        detail_path = os.path.join(out_dir, f"{slug}-bengaluru-detail.webp")
        detail_img.save(detail_path, "WEBP", quality=82)
        
        # Context (800x600)
        im_context_raw = fetch_img(cfg["context_src"])
        context_img = crop_box(im_context_raw, 800, 600, "center")
        context_path = os.path.join(out_dir, f"{slug}-bengaluru-context.webp")
        context_img.save(context_path, "WEBP", quality=82)
        
        # OG Image (1200x630 JPEG)
        og_img = crop_box(im_hero, 1200, 630, "center")
        og_path = os.path.join(out_dir, f"{slug}-bengaluru-og.jpg")
        og_img.save(og_path, "JPEG", quality=85)
        
        # Calculate sizes
        s_hero = os.path.getsize(hero_path)
        s_det = os.path.getsize(detail_path)
        s_ctx = os.path.getsize(context_path)
        s_og = os.path.getsize(og_path)
        total_kb = (s_hero + s_det + s_ctx) / 1024
        
        results.append({
            "slug": slug,
            "hero_kb": s_hero / 1024,
            "det_kb": s_det / 1024,
            "ctx_kb": s_ctx / 1024,
            "total_kb": total_kb,
            "og_kb": s_og / 1024,
            "res": f"{hw}x{hh}"
        })
        print(f" -> Hero: {s_hero/1024:.1f} KB | Detail: {s_det/1024:.1f} KB | Context: {s_ctx/1024:.1f} KB | Total: {total_kb:.1f} KB")
        time.sleep(0.5)

    # 18th Card: Custom Cleaning
    print("\nProcessing [custom-cleaning] for 18th card...")
    custom_dir = os.path.join(CATEGORIES_DIR, "custom-cleaning")
    os.makedirs(custom_dir, exist_ok=True)
    im_custom = fetch_img("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80")
    c_card = crop_box(im_custom, 1200, 750, "center")
    c_card_path = os.path.join(custom_dir, "custom-cleaning-bengaluru-card.webp")
    c_card.save(c_card_path, "WEBP", quality=82)
    print(f" -> Custom Card: {os.path.getsize(c_card_path)/1024:.1f} KB")

    print("\n=== SUMMARY OF PROCESSED CATEGORIES ===")
    for r in results:
        print(f"{r['slug']:28} | Hero ({r['res']}): {r['hero_kb']:5.1f}KB | Detail: {r['det_kb']:5.1f}KB | Context: {r['ctx_kb']:5.1f}KB | Total: {r['total_kb']:5.1f}KB")

if __name__ == "__main__":
    main()
