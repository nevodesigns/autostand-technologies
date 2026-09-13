# AutoStand Technologies

> We build the product and the machine that makes it.

AutoStand designs a foldable, universally compatible phone stand, and the
semi-automatic production system that manufactures it. One company, two
engineering problems, deliberately solved together.

🌐 **[nevodesigns.github.io/autostand-technologies](https://nevodesigns.github.io/autostand-technologies/)**

---

## Repository layout

```
index.html                 markup only, no inline styles or scripts
assets/
  css/styles.css           design tokens, components, responsive, print
  js/main.js               nav, scroll progress, scroll-spy, reveal
  img/logo.svg             header and footer mark
  img/favicon.svg          browser tab icon
  img/README.txt           how to swap the logo
```

No build step, no dependencies, no framework. Open `index.html` and it runs.
Fonts are the only external request.

## Design system

Colour is not used as decoration. The accent appears in exactly five places
across the whole site: the focus ring, the reading-progress bar, the hero
underline, and two elements inside the technical drawings. Hierarchy is carried
by type scale, weight, hairline rules and whitespace instead.

To restyle the brand, change one value in `assets/css/styles.css`:

```css
--accent:#E8232A;
```

The type scale, spacing rhythm and surface colours are all tokens in the same
`:root` block at the top of that file.

## Swapping the logo

`assets/img/logo.svg` and `assets/img/favicon.svg` are placeholders. Replace
`logo.svg` and the header and footer update together. See
`assets/img/README.txt` for the details, including what to change if the logo
is a raster file.

## Accessibility and behaviour

- Skip link, visible focus rings, landmark regions and labelled controls
- Works fully without JavaScript: every section is readable and navigable
- `prefers-reduced-motion` respected, all transitions disabled
- Print stylesheet included
- Responsive from 320px up, with a real mobile navigation

## The team

| Name | Role | Contact |
| --- | --- | --- |
| Godspower Okoduwa | Chief Engineer | [WhatsApp](https://wa.me/qr/3ISP6P4NGU7WG1) |
| Nwokolo Victor Oluebubechukwu | Senior Associate, Aurora Robotics | [WhatsApp](https://wa.me/message/TCRGVFSIQB46E1) |
| Adedayo Elijah | DVEKS Autonomy | [@adedayofagey](https://x.com/adedayofagey) |
| Esuruosho Adeola | EngineBoy Footwears | [@ThatGuy_OnChain](https://x.com/ThatGuy_OnChain) |
| Alghazali Shuaib Taiwo | Marketplace Afrika, CEO | [@AlghazaliTaiwo](https://x.com/AlghazaliTaiwo) |

## Mission

Empowering local industries through affordable automation, making smart
manufacturing accessible across Africa and beyond.

---

© 2026 AutoStand Technologies. All rights reserved.
