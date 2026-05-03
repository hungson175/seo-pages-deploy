# Generated Images Policy

Use generated images selectively, not as decorative unique art on every programmatic SEO page.

## Recommended Rollout

1. `/tu-vi/` hub: one strong hero/OG image.
2. Six approved `/sao/` foundation pages: unique symbolic hero/OG images because each star has a real archetype.
3. Twelve animal hubs: one reusable con-giáp manuscript image per animal.
4. Birth-year pages: reuse animal / Can-Chi template assets; do not create bespoke images for every year-gender page yet.
5. Later educational diagrams: 12-cung wheel, Mệnh/Thân/Cục, Tam Phương Tứ Chính.

## 2026-05-03 Update: Reusable Palace Image Set

Boss approved a small reusable image layer rather than thousands of one-off SEO images. The first shipped set is **exactly 12 images**, one for each approved 12-cung foundation page:

Mệnh, Phụ Mẫu, Phúc Đức, Điền Trạch, Quan Lộc, Nô Bộc, Thiên Di, Tật Ách, Tài Bạch, Tử Nữ, Phu Thê, Huynh Đệ.

Implementation notes:

- Source files live in `public/images/palaces/*.webp`.
- File names follow `tu-vi-cung-{slug}.webp`.
- Metadata and alt/caption copy live in `src/content/palace-images.ts`.
- Use the 800×600 palace images for visible page/article imagery and Article schema only; do **not** use them as Open Graph images because OG needs a 1200×630 template.
- Use the domain-approved term **Tử Nữ**, not `Tử Tức`, in filenames, slugs, alt text, captions, and tests.
- Images must remain reusable, text-free, and non-deterministic: no words, numbers, Hán glyphs, UI screenshots, money/health/death guarantees, or baby/wedding promises.
- Forecast article sections may reuse the closest palace visual, e.g. Quan Lộc for career, Tài Bạch for money, Phu Thê for relationships, Tật Ách for wellbeing.

## Visual Style

Match the reference theme in `docs/reference/horoscope-ui-theme.md`: ivory manuscript paper, deep indigo ink, muted gold linework, vermillion seal, scholarly Vietnamese / Hán-Việt mood. Good motifs: symbolic lá số wheels, star glyphs, con giáp brush silhouettes, calm manuscript diagrams.

Avoid scary occult imagery, ghosts, bùa chú, money piles, hospital/body visuals, wedding/baby guarantees, fake result screenshots, or anything implying fate-changing certainty.

## Copy, Alt Text, and Compliance

- Captions may say: “Minh họa theo phong cách thủ bản Tử Vi; không phải lá số cá nhân.”
- Alt text must be factual and concise, not keyword-stuffed.
- Never use claims such as “đúng 100%”, “chắc chắn”, “phát tài”, “chữa bệnh”, “sống lâu”, “giải hạn”, or “đổi vận” in image text, caption, or alt text.

## Technical Rules

Use stable descriptive filenames, WebP/AVIF where possible, explicit width/height, responsive sizes, and lazy loading below the fold. Only include visible, relevant images in Article schema. Add AI-image metadata such as IPTC `DigitalSourceType=TrainedAlgorithmicMedia` when feasible.
