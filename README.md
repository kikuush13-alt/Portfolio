# Portfolio - Khadija Okbi

Modern editorial portfolio showcasing creative design work, video production, marketing, and web development by Khadija Okbi, Mediamatikerin EFZ.

## Features

### Smooth Rounded Wave Transitions
- **Organic SVG curves** between all major sections
- **Unique patterns** for each transition
- **Fully responsive** with optimized mobile heights
- **Color-matched** to adjacent sections for seamless flow

### Hero Section
- Full-screen video background (Petrichor project)
- Animated tagline: "think more design less"
- GSAP entrance animations

### What I Do Section
Expandable skill cards with:
- Visual Art (Adobe Creative Suite)
- Video Production & Editing
- Marketing & Social Media
- Web Development (HTML, CSS, JS, PHP)

### Projects Gallery
- 24 curated projects across multiple disciplines
- Filter by category (All, Visual Art, Motion, Marketing, Web Dev)
- Chessboard alternating light/dark project cards
- Detailed project pages for each work

### About Me Section
Comprehensive profile including:
- **MBTI Personality**: INTP-A with interactive trait circles
- **Education Timeline**: Complete career journey from 2018-2025
- **Favorites**: Books, colors, podcasts, series
- **Spotify Wrapped**: Top music tracks
- **Technical Skills**: Adobe suite, frontend/backend development
- **Soft Skills**: Strategic, creative, analytical

### Blog Section
Featured articles on:
- "Die Illusion der freien Meinung" (Democracy in times of Social Media & AI)
- Social media growth strategies
- Threads community building

## Design System

### Colors
- **Primary Background**: `#000` (Black)
- **Secondary Background**: `#ebebeb` (Light Gray)
- **Accent**: `#F5F5F5` (Off-White)
- **Dark Accent**: `#314A51` (Dark Teal)

### Typography
- **Body**: Work Sans
- **Display**: Playfair Display (serif)
- **Headings**: Higuen (custom)

### Animations
- GSAP 3.12.5 with ScrollTrigger
- ScrollSmoother for buttery scroll
- SplitType for text animations
- Custom intersection observers for wave effects

## Technical Stack

- **HTML5**: Semantic structure with ARIA labels
- **CSS3**: Custom properties, flexbox, grid
- **JavaScript**: Vanilla JS with GSAP
- **Video**: MP4 hero background
- **Fonts**: Custom web fonts (Higuen, Bruney, etc.)

## File Structure

```
Portfolio/
├── fonts/              # Custom fonts (7 files)
│   ├── Higuen.woff2
│   ├── Bruney.woff
│   └── ...
├── img/               # Images and gallery (68 files)
│   ├── gallery/      # Project thumbnails (24 images)
│   ├── portrait.jpg
│   └── logo_*.png
├── style/            # CSS stylesheets
│   └── style.css    # Main styles (1400+ lines)
├── video/           # Hero and project videos
│   └── petrichor_hero.mp4
└── index.html       # Main portfolio page (800+ lines)
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## Development

To run locally:

```bash
# Start a local server
python3 -m http.server 8000

# Or use any static server
npx serve
```

## Performance

- Optimized images
- Lazy-loaded videos
- Efficient GSAP animations
- Minimal dependencies
- Clean, maintainable code

## Credits

**Design & Development**: Khadija Okbi  
**Portfolio Type**: Mediamatikerin EFZ  
**Location**: Switzerland  

---

© 2025 Design & Development by Khadija Okbi