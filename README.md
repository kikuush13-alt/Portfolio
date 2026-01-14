# Portfolio - Clean Luxury UI

A minimalist, elegant portfolio website designed with a focus on clean aesthetics, visual hierarchy, and smooth interactions.

## Design Philosophy

This portfolio follows a "Design less, think more" philosophy, emphasizing:
- **No gradients** - Pure, solid colors throughout
- **Sharp corners** - Clean edges (except for skill bars and timeline markers which retain rounded corners)
- **Visual hierarchy** - Clear spacing, contrast, and typography
- **Smooth interactions** - GSAP-powered animations
- **Luxury minimalism** - Elegant, intentional, premium feel

## Features

### 1. Hero Section
- Playfair Display typography with italic/bold highlights
- Animated entrance with GSAP
- Centered "Design less think more." tagline

### 2. Section Transitions
- Unique SVG wave-shaped transitions between all sections
- Each wave has a different pattern
- Subtle visual separation

### 3. MBTI/Personality Insights
- Circular charts with centered percentages
- SVG progress bars with sharp edges
- Percentages integrated inside bars
- Animated on scroll

### 4. Skills Section
- Skill bars with percentages always visible inside
- **Hover** (desktop): Preview scaling effect
- **Click**: Opens detailed description and filters projects
- **Mobile**: Tap to open details
- Rounded corners maintained for elegance

### 5. Skills-Projects Connection
- Clicking a skill automatically filters projects by category
- Hovering over projects highlights the corresponding skill
- Visual connection creates cohesive user experience

### 6. Projects/Gallery
- 4-column grid layout
- Chessboard alternating light/dark background pattern
- Category filtering with active states
- Images fill container completely
- Square, not rounded cards

### 7. About Me
- Two equal-width columns
- Left: Profile image + CV-style info
- Right: Text with large initial letter + justified alignment
- No backgrounds or borders
- Clean, calm layout

### 8. Timeline
- Reduced size and visual weight
- Elegant, minimal design
- Fully responsive with scaling text
- Rounded timeline markers preserved

### 9. Blog Section
- Square cards (not rounded)
- White, readable titles
- Dark background for contrast
- Hover animations

### 10. Animations
- Smooth scroll behavior
- GSAP-based animations throughout
- Section entrance effects
- Scroll-triggered animations
- Subtle, premium feel

## Technical Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS custom properties
- **Vanilla JavaScript** - No framework dependencies
- **GSAP (minimal)** - Custom lightweight animation library
- **SVG** - For icons, waves, and charts

## File Structure

```
Portfolio/
├── index.html          # Main HTML structure
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Interactive functionality
├── lib/
│   └── gsap-minimal.js # Lightweight animation library
├── images/
│   ├── project*.svg    # Project placeholders
│   ├── blog*.svg       # Blog post images
│   └── profile.svg     # Profile image
└── README.md
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

## Color Palette

- **Primary Dark**: `#0a0a0a`
- **Primary Light**: `#f8f8f8`
- **Accent**: `#2a2a2a`
- **Border**: `#e0e0e0`

## Typography

- **Display Font**: Playfair Display (headings)
- **Body Font**: Inter (content)

## Development

To run locally:

```bash
# Start a local server
python3 -m http.server 8000

# Open browser
# Navigate to http://localhost:8000
```

## Performance

- Minimal dependencies
- Optimized animations
- Responsive images (SVG)
- Clean, maintainable code

## License

© 2024 Portfolio. All rights reserved.