export const faq = [
  { q: "How do you calculate aspect ratio?", a: "Divide the width and height by their greatest common divisor. 1920 × 1080: the greatest common divisor is 120, so the ratio is 16:9. As a decimal, 1920 ÷ 1080 = 1.78:1." },
  { q: "How do I resize an image without stretching it?", a: "Keep the ratio the same: new height = new width × (ratio height ÷ ratio width). A 16:9 image resized to 1280 px wide must be 1280 × 9 ÷ 16 = 720 px tall." },
  { q: "What is the difference between fit and fill?", a: "Fit (contain or letterbox) scales the media until it fits entirely inside the frame, leaving bars on two sides. Fill (cover) scales it until the frame is completely covered and crops whatever spills over. A 4000 × 3000 photo in a 1920 × 1080 frame fits at 1440 × 1080 with bars, or fills at 1920 × 1440 with 360 px cropped." },
  { q: "What aspect ratio is 1080p and 4K?", a: "Both are 16:9. 1080p is 1920 × 1080 and consumer 4K (UHD) is 3840 × 2160. Cinema 4K (DCI) is 4096 × 2160, about 1.9:1." },
  { q: "What aspect ratio should I use for social media?", a: "Common choices are 9:16 for vertical video (Reels, TikTok, Shorts), 1:1 or 4:5 for feed posts, and 16:9 for YouTube and landscape video. Platforms change their recommendations, so check the current guidelines before a big campaign." },
  { q: "Why should video dimensions be even numbers?", a: "Most video codecs store color at half resolution (4:2:0 chroma subsampling), which needs even width and height. Round resized dimensions to the nearest even number for video." },
];
