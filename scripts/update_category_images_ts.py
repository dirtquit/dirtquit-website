import os

configs = [
    {
        'slug': 'home-cleaning',
        'var': 'home',
        'w': 1200, 'h': 900,
        'alt_hero': 'Professional cleaner in uniform cleaning modern apartment interior',
        'alt_detail': 'Microfiber cleaning cloth and cleaning solution bottle on surface',
        'alt_context': 'Spacious and bright modern home living room with natural sunlight',
    },
    {
        'slug': 'deep-cleaning',
        'var': 'deep',
        'w': 1200, 'h': 900,
        'alt_hero': 'Spotless modern apartment living room with polished vitrified tile floor',
        'alt_detail': 'Clean polished living room tile floor reflecting ambient light',
        'alt_context': 'Organized living space with clean seating and bright sliding window',
    },
    {
        'slug': 'apartment-cleaning',
        'var': 'apartment',
        'w': 1200, 'h': 900,
        'alt_hero': 'Sunlit modern apartment living hall with sofa and wooden floor',
        'alt_detail': 'Clean floor edge and wall baseboard in sunny apartment room',
        'alt_context': 'Modern apartment residential building view under clear sky',
    },
    {
        'slug': 'bathroom-cleaning',
        'var': 'bathroom',
        'w': 1024, 'h': 768,
        'alt_hero': 'Clean bathroom with ceramic wall tiles, mirror, and white commode',
        'alt_detail': 'Polished chrome bathroom mixer faucet and clean white ceramic sink basin',
        'alt_context': 'Bright modern bathroom washroom with glass partition and wall tiles',
    },
    {
        'slug': 'kitchen-cleaning',
        'var': 'kitchen',
        'w': 1024, 'h': 768,
        'alt_hero': 'Clean modular kitchen countertop, sink, and backsplash tiles',
        'alt_detail': 'Stainless steel gas burner hob and polished granite counter surface',
        'alt_context': 'Modern modular kitchen layout with clean cabinets and storage shelves',
    },
    {
        'slug': 'sofa-cleaning',
        'var': 'sofa',
        'w': 1024, 'h': 768,
        'alt_hero': 'Clean fabric sectional sofa with cushions in bright living room',
        'alt_detail': 'Clean woven upholstery fabric weave and cushion seam detail',
        'alt_context': 'Comfortable furnished living room with clean sofa seating area',
    },
    {
        'slug': 'carpet-cleaning',
        'var': 'carpet',
        'w': 1200, 'h': 900,
        'alt_hero': 'Clean modern living room with patterned area rug on floor',
        'alt_detail': 'Close-up of clean woven carpet fibers and detailed border pattern',
        'alt_context': 'Warm living room interior with clean rug centered under coffee table',
    },
    {
        'slug': 'mattress-cleaning',
        'var': 'mattress',
        'w': 1200, 'h': 900,
        'alt_hero': 'Clean mattress and neat white bed linens in a modern bedroom',
        'alt_detail': 'Close-up of clean quilted white mattress top fabric and stitched pattern',
        'alt_context': 'Spacious bedroom with neatly made bed, headboard, and bedside lighting',
    },
    {
        'slug': 'floor-cleaning',
        'var': 'floor',
        'w': 1200, 'h': 900,
        'alt_hero': 'Clean polished ceramic tile floor with neat grout seams',
        'alt_detail': 'Close-up of clean vitrified tile grout line and polished surface',
        'alt_context': 'Bright apartment hallway with clean floor reflecting natural daylight',
    },
    {
        'slug': 'window-cleaning',
        'var': 'window',
        'w': 1200, 'h': 900,
        'alt_hero': 'Clean transparent glass window overlooking outdoor trees and daylight',
        'alt_detail': 'Clear glass window pane and metal frame joint free of dust',
        'alt_context': 'Sunlit interior room with large clean glass windows providing natural light',
    },
    {
        'slug': 'move-in-move-out-cleaning',
        'var': 'moveInMoveOut',
        'w': 1200, 'h': 900,
        'alt_hero': 'Empty clean apartment room with spotless floor and white walls ready for move-in',
        'alt_detail': 'Clean empty apartment room corner and baseboard in bright morning light',
        'alt_context': 'Move-in ready empty residential space with polished flooring and clear windows',
    },
    {
        'slug': 'office-cleaning',
        'var': 'office',
        'w': 1200, 'h': 900,
        'alt_hero': 'Modern commercial office interior with clean desks and ergonomic chairs',
        'alt_detail': 'Clean workstation desk surface, keyboard area, and organized office supplies',
        'alt_context': 'Open-plan corporate office workspace with clean partition screens and lighting',
    },
    {
        'slug': 'post-construction-cleaning',
        'var': 'postConstruction',
        'w': 1200, 'h': 900,
        'alt_hero': 'Freshly renovated apartment interior with clean walls and newly laid floor',
        'alt_detail': 'Clean newly installed architectural trim and baseboard after renovation',
        'alt_context': 'Renovated bright living space free of construction dust and debris',
    },
    {
        'slug': 'balcony-cleaning',
        'var': 'balcony',
        'w': 1200, 'h': 900,
        'alt_hero': 'Clean apartment balcony with potted green plants and outdoor floor',
        'alt_detail': 'Clean balcony floor tiles and balcony railing detail in daylight',
        'alt_context': 'Exterior apartment building facade showing clean outdoor balcony ledges',
    },
    {
        'slug': 'appliance-cleaning',
        'var': 'appliance',
        'w': 1200, 'h': 900,
        'alt_hero': 'Modern kitchen with stainless steel refrigerator and clean microwave oven',
        'alt_detail': 'Clean exterior surface and handle of kitchen appliance',
        'alt_context': 'Modular kitchen setup with clean integrated household appliances',
    },
    {
        'slug': 'regular-home-cleaning',
        'var': 'regularHome',
        'w': 1200, 'h': 900,
        'alt_hero': 'Tidy everyday apartment living room with organized furniture and natural light',
        'alt_detail': 'Clean organized coffee table top and decorative accents in living room',
        'alt_context': 'Well-kept apartment living space maintained for routine daily living',
    },
    {
        'slug': 'specialized-cleaning',
        'var': 'specialized',
        'w': 1200, 'h': 900,
        'alt_hero': 'Clean spacious dance and yoga fitness studio with polished floor and wall mirrors',
        'alt_detail': 'Clean polished wooden studio floor reflecting natural ambient light',
        'alt_context': 'Specialized fitness studio room with clean floor and open exercise space',
    },
]

out = []
out.append('import type { CategoryImages } from "./types";\n')

# Custom cleaning card import
out.append('import customCleaningCard from "@/assets/categories/custom-cleaning/custom-cleaning-bengaluru-card.webp";\n')

for c in configs:
    s = c['slug']
    v = c['var']
    out.append(f'// {s}')
    out.append(f'import {v}Hero from "@/assets/categories/{s}/{s}-bengaluru-hero.webp";')
    out.append(f'import {v}Hero800 from "@/assets/categories/{s}/{s}-bengaluru-hero-800.webp";')
    out.append(f'import {v}Hero480 from "@/assets/categories/{s}/{s}-bengaluru-hero-480.webp";')
    out.append(f'import {v}Og from "@/assets/categories/{s}/{s}-bengaluru-og.jpg";')
    out.append(f'import {v}Detail from "@/assets/categories/{s}/{s}-bengaluru-detail.webp";')
    out.append(f'import {v}Context from "@/assets/categories/{s}/{s}-bengaluru-context.webp";\n')

out.append('export const CATEGORY_IMAGES: Record<string, CategoryImages> = {')
for c in configs:
    s = c['slug']
    v = c['var']
    w, h = c['w'], c['h']
    alt_h = c['alt_hero']
    alt_d = c['alt_detail']
    alt_c = c['alt_context']
    out.append(f'  "{s}": {{')
    out.append('    hero: {')
    out.append(f'      src: {v}Hero,')
    out.append(f'      alt: "{alt_h}",')
    out.append(f'      width: {w},')
    out.append(f'      height: {h},')
    out.append(f'      srcset: `${{{v}Hero480}} 480w, ${{{v}Hero800}} 800w, ${{{v}Hero}} {w}w`,')
    out.append('      sizes: "(min-width: 1024px) 45vw, 100vw",')
    out.append('    },')
    out.append('    detail: {')
    out.append(f'      src: {v}Detail,')
    out.append(f'      alt: "{alt_d}",')
    out.append('      width: 800,')
    out.append('      height: 600,')
    out.append('    },')
    out.append('    context: {')
    out.append(f'      src: {v}Context,')
    out.append(f'      alt: "{alt_c}",')
    out.append('      width: 800,')
    out.append('      height: 600,')
    out.append('    },')
    out.append('    og: {')
    out.append(f'      src: {v}Og,')
    out.append('    },')
    out.append('  },')

out.append('};\n')
out.append('export { customCleaningCard };\n')
out.append('export function getCategoryImages(slug: string): CategoryImages | undefined {')
out.append('  return CATEGORY_IMAGES[slug];')
out.append('}\n')

with open('src/data/categoryImages.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))

print('Updated src/data/categoryImages.ts with all 17 categories!')
