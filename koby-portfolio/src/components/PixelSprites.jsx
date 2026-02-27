import React from 'react';

/* =============================================
   PIXEL SPRITE RENDERER
   Renders 2D color arrays as pixel-art grids
   ============================================= */

const _ = null; // transparent

export const PixelSprite = ({ pixels, pixelSize = 4, className = '', style = {} }) => {
  const cols = pixels[0]?.length || 0;
  return (
    <div
      className={`inline-block ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${pixelSize}px)`,
        imageRendering: 'pixelated',
        lineHeight: 0,
        gap: 0,
        ...style
      }}
    >
      {pixels.flat().map((color, i) => (
        <div
          key={i}
          style={{
            width: pixelSize,
            height: pixelSize,
            background: color || 'transparent',
          }}
        />
      ))}
    </div>
  );
};

/* =============================================
   SPRITE DATA — Color Palettes
   ============================================= */

// Trainer (Koby) - 16x24 — dark hair, white hoodie, jeans
const P = '#FDBCB4'; // skin
const H = '#2a1506'; // dark brown hair
const W = '#F0F0F0'; // white hoodie
const J = '#1E3A5F'; // blue jeans
const S = '#CC3300'; // red accent
const B = '#111111'; // black
const G = '#888888'; // gray

export const TRAINER_PIXELS = [
  // ── Head: dark hair, face ──
  [_,_,_,B,B,B,B,B,B,B,B,_,_,_,_,_],
  [_,_,B,H,H,H,H,H,H,H,B,B,_,_,_,_],
  [_,B,H,H,H,H,H,H,H,H,H,H,B,_,_,_],
  [_,B,H,H,P,P,P,P,P,P,H,H,B,_,_,_],
  [_,B,H,P,P,P,P,P,P,P,P,H,B,_,_,_],
  [_,_,B,P,P,P,P,P,P,P,P,B,_,_,_,_],
  [_,_,B,P,B,P,P,P,P,B,P,B,_,_,_,_],  // eyes
  [_,_,_,B,P,P,G,P,G,P,B,_,_,_,_,_],  // subtle smirk
  [_,_,_,_,B,P,P,P,P,B,_,_,_,_,_,_],
  // ── Hoodie: collar with red drawstring tips ──
  [_,_,B,B,B,W,S,S,W,B,B,B,_,_,_,_],
  [_,B,W,W,W,W,G,G,W,W,W,W,B,_,_,_],  // center seam starts
  [B,W,W,W,W,W,G,G,W,W,W,W,W,B,_,_],
  [B,W,W,W,W,W,G,G,W,W,W,W,W,B,_,_],
  [B,W,W,W,W,W,G,G,W,W,W,W,W,B,_,_],  // center zip seam (≠ nipples)
  [_,B,W,W,B,W,G,G,W,W,W,W,B,_,_,_],  // hoodie pocket left edge
  [_,B,W,W,B,B,W,W,B,B,W,W,B,_,_,_],  // pocket base
  // ── Jeans ──
  [_,_,B,J,J,B,B,B,B,B,J,J,B,_,_,_],
  [_,_,B,J,J,J,_,_,_,J,J,J,B,_,_,_],
  [_,_,B,J,J,J,_,_,_,J,J,J,B,_,_,_],
  [_,_,B,J,J,J,_,_,_,J,J,J,B,_,_,_],
  [_,_,B,J,J,J,_,_,_,J,J,J,B,_,_,_],
  [_,_,B,G,J,J,_,_,_,J,J,G,B,_,_,_],
  [_,_,B,G,G,B,_,_,_,B,G,G,B,_,_,_],
  [_,_,_,B,B,_,_,_,_,_,B,B,_,_,_,_],
];

// ===================== EXPERIENCE "MON" SPRITES =====================

// KORION — Electric/Steel (Korio SWE) — 16x16
const Ko = '#FFD700'; // yellow electric
const Kb = '#0044CC'; // blue steel
const Kd = '#002288'; // dark blue
const Kl = '#FFFF88'; // light yellow

export const KORION_PIXELS = [
  [_,_,_,Ko,Ko,Ko,Ko,Ko,Ko,Ko,_,_,_,_,_,_],
  [_,_,Ko,Ko,Ko,Ko,Ko,Ko,Ko,Ko,Ko,_,_,_,_,_],
  [_,Ko,Kb,Kb,Ko,Ko,Ko,Ko,Ko,Kb,Kb,Ko,_,_,_,_],
  [Ko,Kb,Kd,Kl,Kb,Ko,Ko,Ko,Kb,Kl,Kd,Kb,Ko,_,_,_],
  [Ko,Kb,Kl,Kl,Kb,Ko,Ko,Ko,Kb,Kl,Kl,Kb,Ko,_,_,_],
  [_,Ko,Kb,Kb,Ko,Ko,Ko,Ko,Ko,Kb,Kb,Ko,_,_,_,_],
  [_,_,Ko,Ko,Kb,Kb,Kb,Kb,Kb,Ko,Ko,_,_,_,_,_],
  [_,Ko,Ko,Kb,Kb,Kd,Kd,Kb,Kb,Ko,Ko,_,_,_,_,_],
  [Ko,Ko,Ko,Kb,Kd,Kd,Kd,Kd,Kb,Ko,Ko,Ko,_,_,_,_],
  [Ko,Ko,Ko,Ko,Kb,Kb,Kb,Kb,Ko,Ko,Ko,Ko,_,_,_,_],
  [Kl,Ko,Ko,Ko,Ko,Ko,Ko,Ko,Ko,Ko,Ko,Kl,_,_,_,_],
  [Kl,Kl,Ko,Ko,Ko,Ko,Ko,Ko,Ko,Ko,Kl,Kl,_,_,_,_],
  [_,Kl,Kl,Ko,Ko,Kb,Kb,Ko,Ko,Kl,Kl,_,_,_,_,_],
  [_,_,Ko,Kl,Kl,Ko,Ko,Kl,Kl,Ko,_,_,_,_,_,_],
  [_,Ko,Ko,Ko,Ko,_,_,Ko,Ko,Ko,Ko,_,_,_,_,_],
  [Ko,_,_,Ko,Ko,_,_,Ko,Ko,_,_,Ko,_,_,_,_],
];

// DEEREBOT — Steel/Grass (John Deere) — 16x16
const DG = '#367C2B'; // deere green
const DY = '#FFDE00'; // deere yellow
const Ds = '#B8B8D0'; // steel
const Dd = '#666666'; // dark metal

export const DEEREBOT_PIXELS = [
  [_,_,_,DG,DG,DG,DG,DG,DG,DG,_,_,_,_,_,_],
  [_,_,DG,DG,DG,DG,DG,DG,DG,DG,DG,_,_,_,_,_],
  [_,DG,Ds,Ds,DG,DG,DG,DG,DG,Ds,Ds,DG,_,_,_,_],
  [DG,Ds,Dd,DY,Ds,DG,DG,DG,Ds,DY,Dd,Ds,DG,_,_,_],
  [DG,Ds,DY,DY,Ds,DG,DG,DG,Ds,DY,DY,Ds,DG,_,_,_],
  [_,DG,Ds,Ds,DG,DG,DG,DG,DG,Ds,Ds,DG,_,_,_,_],
  [_,_,DG,DG,Ds,Ds,Ds,Ds,Ds,DG,DG,_,_,_,_,_],
  [_,DG,Ds,Ds,Ds,Dd,Dd,Ds,Ds,Ds,DG,_,_,_,_,_],
  [DG,Ds,Ds,Ds,Dd,Dd,Dd,Dd,Ds,Ds,Ds,DG,_,_,_,_],
  [DG,DY,DG,DG,Ds,Ds,Ds,Ds,DG,DG,DY,DG,_,_,_,_],
  [DG,DY,DY,DG,DG,DG,DG,DG,DG,DY,DY,DG,_,_,_,_],
  [_,DG,DY,DY,DG,DG,DG,DG,DY,DY,DG,_,_,_,_,_],
  [_,_,DG,DY,DY,Ds,Ds,DY,DY,DG,_,_,_,_,_,_],
  [_,_,DG,DG,DY,DG,DG,DY,DG,DG,_,_,_,_,_,_],
  [_,Ds,DG,DG,DG,_,_,DG,DG,DG,Ds,_,_,_,_,_],
  [Ds,_,_,Ds,Ds,_,_,Ds,Ds,_,_,Ds,_,_,_,_],
];

// PROFESSORIX — Psychic/Flying (TA) — 16x16
const PO = '#705898'; // psychic purple
const PA = '#AA88CC'; // light purple
const PW = '#F0E0FF'; // very light
const Pk = '#333';

export const PROFESSORIX_PIXELS = [
  [_,_,_,PO,PA,PA,PA,PA,PA,PA,PO,_,_,_,_,_],
  [_,_,PA,PA,PW,PW,PW,PW,PW,PW,PA,PA,_,_,_,_],
  [_,PA,PW,PW,PA,PW,PW,PW,PA,PW,PW,PA,_,_,_,_],
  [PA,PW,PA,Pk,PW,PW,PW,PW,PW,Pk,PA,PW,PA,_,_,_],
  [PA,PW,PA,PA,PW,Pk,PA,PA,Pk,PW,PA,PA,PW,_,_,_],
  [_,PA,PW,PW,PO,PA,PA,PA,PA,PO,PW,PA,_,_,_,_],
  [_,_,PA,PO,PO,PA,PA,PA,PA,PO,PO,PA,_,_,_,_],
  [_,PA,PA,PO,PA,PA,PA,PA,PA,PA,PO,PA,_,_,_,_],
  [PA,PA,PA,PA,PA,PW,PW,PW,PA,PA,PA,PA,_,_,_,_],
  [PO,PA,PA,PA,PW,PW,PW,PW,PW,PA,PA,PO,_,_,_,_],
  [PO,PO,PA,PA,PA,PA,PA,PA,PA,PA,PO,PO,_,_,_,_],
  [_,PO,PO,PA,PA,PO,PO,PA,PA,PO,PO,_,_,_,_,_],
  [_,_,PO,PA,PA,PA,PA,PA,PA,PA,PO,_,_,_,_,_],
  [_,_,_,PO,PA,PA,PA,PA,PA,PO,_,_,_,_,_,_],
  [_,_,PO,PO,_,_,_,_,_,PO,PO,_,_,_,_,_],
  [_,PO,_,_,_,_,_,_,_,_,_,PO,_,_,_,_],
];

// SYSRAT — Rock/Normal (IOState IT) — 16x16
const SR = '#B8A038'; // rock gold
const Sm = '#888866'; // stone
const Sb = '#3a3020'; // dark stone
const Sw = '#DDCC88'; // light
const Smm = '#999966'; // stripe

export const SYSRAT_PIXELS = [
  [_,_,_,Sb,Sm,Sm,Sb,_,_,_,_,_,_,_,_,_],
  [_,_,Sb,SR,SR,SR,SR,Sb,_,_,_,_,_,_,_,_],
  [_,Sb,SR,SR,Sw,Sw,SR,SR,Sb,Sb,_,_,_,_,_,_],
  [Sb,SR,SR,Sb,SR,SR,SR,Sb,SR,SR,Sb,_,_,_,_,_],
  [Sb,SR,Sw,SR,SR,SR,SR,SR,SR,Sw,SR,Sb,_,_,_,_],
  [_,Sb,SR,SR,SR,Sb,Sb,SR,SR,SR,Sb,_,_,_,_,_],
  [_,_,Sb,SR,SR,SR,SR,SR,SR,Sb,_,_,_,_,_,_],
  [_,Sb,SR,Sb,SR,' ',_,SR,Sb,SR,Sb,_,_,_,_,_],
  [Sb,SR,SR,SR,SR,_,_,SR,SR,SR,SR,Sb,_,_,_,_],
  [Sb,SR,Sw,SR,SR,SR,SR,SR,SR,Sw,SR,Sb,_,_,_,_],
  [_,Sb,SR,SR,SR,SR,SR,SR,SR,SR,Sb,_,_,_,_,_],
  [_,_,SR,SR,Smm,Sb,Sb,Smm,SR,SR,_,_,_,_,_,_],
  [_,_,Sb,SR,SR,SR,SR,SR,SR,Sb,_,_,_,_,_,_],
  [_,Sb,SR,_,Sb,_,_,Sb,_,SR,Sb,_,_,_,_,_],
  [_,Sb,_,_,_,_,_,_,_,_,Sb,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
];

// CLOUDWING — Water/Flying (Cloud/AWS experience) — 16x16
const CW = '#6890F0'; // water blue
const CL = '#A0C0FF'; // light blue
const Cw = '#FFFFFF'; // white cloud
const Ca = '#A890F0'; // flying purple

export const CLOUDWING_PIXELS = [
  [_,_,_,_,_,Cw,Cw,Cw,Cw,_,_,_,_,_,_,_],
  [_,_,_,_,Cw,CL,CL,CL,CL,Cw,_,_,_,_,_,_],
  [_,_,Cw,Cw,CL,CW,CW,CW,CW,CL,Cw,Cw,_,_,_,_],
  [_,Cw,CL,CW,CW,CW,CW,CW,CW,CW,CW,CL,Cw,_,_,_],
  [Cw,CL,CW,CW,Cw,Cw,CW,CW,Cw,Cw,CW,CW,CL,Cw,_,_],
  [Cw,CW,CW,CW,Cw,Cw,CW,CW,Cw,Cw,CW,CW,CW,Cw,_,_],
  [Cw,Ca,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,Ca,Cw,_,_],
  [_,Cw,Ca,CW,CL,CL,CL,CL,CL,CL,CW,Ca,Cw,_,_,_],
  [_,_,Cw,Ca,CW,CW,CW,CW,CW,CW,Ca,Cw,_,_,_,_],
  [_,_,Ca,Ca,CL,CL,CL,CL,CL,CL,Ca,Ca,_,_,_,_],
  [_,Ca,Ca,CL,CL,CW,CW,CW,CW,CL,CL,Ca,Ca,_,_,_],
  [Ca,Ca,CL,CW,CW,CW,CW,CW,CW,CW,CW,CL,Ca,Ca,_,_],
  [Ca,CL,CW,CW,CW,Ca,Ca,Ca,Ca,CW,CW,CW,CL,Ca,_,_],
  [_,Ca,CW,CW,Ca,_,_,_,_,Ca,CW,CW,Ca,_,_,_],
  [_,_,Ca,Ca,_,_,_,_,_,_,Ca,Ca,_,_,_,_],
  [_,Ca,_,_,_,_,_,_,_,_,_,_,Ca,_,_,_],
];

// HAWKITE (ISU student) — Normal/Grass (Iowa State) — 16x16
const HI = '#CC0000'; // cardinal red
const HG = '#F8D800'; // ISU gold
const Hd = '#880000'; // dark red
const Hw = '#F8F8F8'; // white

export const HAWKITE_PIXELS = [
  [_,_,_,_,HI,HI,HI,HI,HI,HI,_,_,_,_,_,_],
  [_,_,_,HI,HG,HG,HI,HI,HG,HG,HI,_,_,_,_,_],
  [_,_,HI,HG,HG,HG,HI,HI,HG,HG,HG,HI,_,_,_,_],
  [_,HI,HG,HG,HI,HG,HI,HI,HG,HI,HG,HG,HI,_,_,_],
  [_,HI,HG,HI,HI,HG,HI,HI,HG,HI,HI,HG,HI,_,_,_],
  [_,HI,HI,HI,HG,HG,HI,HI,HG,HG,HI,HI,HI,_,_,_],
  [_,_,HI,HI,HG,HI,HI,HI,HI,HG,HI,HI,_,_,_,_],
  [_,_,_,HI,HI,HI,Hd,Hd,HI,HI,HI,_,_,_,_,_],
  [_,HI,HI,HI,HI,Hd,Hd,Hd,Hd,HI,HI,HI,HI,_,_,_],
  [HI,Hw,Hw,Hw,Hd,Hd,Hd,Hd,Hd,Hd,Hw,Hw,Hw,HI,_,_],
  [HI,HG,HG,Hd,Hd,Hd,Hd,Hd,Hd,Hd,Hd,HG,HG,HI,_,_],
  [_,HI,HG,HG,Hd,HI,HI,HI,HI,Hd,HG,HG,HI,_,_,_],
  [_,_,HI,HG,HG,HI,_,_,HI,HG,HG,HI,_,_,_,_],
  [_,_,_,HI,HI,_,_,_,_,HI,HI,_,_,_,_,_],
  [_,_,HG,HG,_,_,_,_,_,_,HG,HG,_,_,_,_],
  [_,HG,_,_,_,_,_,_,_,_,_,_,HG,_,_,_],
];

/* =============================================
   PROJECT ENTRY SPRITES
   ============================================= */

// CLINICOR — Electric/Steel (#001 — Korio clinical platform)
const CE = '#F8D030'; // electric yellow
const CS = '#B8B8D0'; // steel
const Cb = '#111';
const Cl = '#FFFFFF';

export const CLINICOR_PIXELS = [
  [_,_,CE,CE,CE,CE,CE,CE,CE,CE,CE,CE,_,_,_,_],
  [_,CE,CS,CS,CS,CS,CS,CS,CS,CS,CS,CS,CE,_,_,_],
  [CE,CS,Cb,CS,CS,CS,CS,CS,CS,CS,CS,Cb,CS,CE,_,_],
  [CE,CS,CS,CE,CE,CE,CE,CE,CE,CE,CE,CS,CS,CE,_,_],
  [CE,CS,CS,CE,Cl,Cl,Cl,Cl,Cl,Cl,CE,CS,CS,CE,_,_],
  [CE,CS,CE,CE,Cl,CE,CE,CE,CE,Cl,CE,CE,CS,CE,_,_],
  [CE,CS,CE,CE,Cl,CE,CS,CS,CE,Cl,CE,CE,CS,CE,_,_],
  [CE,CS,CE,CE,Cl,CE,CS,CS,CE,Cl,CE,CE,CS,CE,_,_],
  [CE,CS,CE,CE,Cl,CE,CE,CE,CE,Cl,CE,CE,CS,CE,_,_],
  [CE,CS,CS,CE,Cl,Cl,Cl,Cl,Cl,Cl,CE,CS,CS,CE,_,_],
  [CE,CS,CS,CE,CE,CE,CE,CE,CE,CE,CE,CS,CS,CE,_,_],
  [CE,CS,Cb,CS,CS,CS,CS,CS,CS,CS,CS,Cb,CS,CE,_,_],
  [_,CE,CS,CS,CS,CS,CS,CS,CS,CS,CS,CS,CE,_,_,_],
  [_,_,CE,CE,CE,CE,CE,CE,CE,CE,CE,CE,_,_,_,_],
  [_,_,_,_,CE,CE,_,_,CE,CE,_,_,_,_,_,_],
  [_,_,_,CE,CE,_,_,_,_,CE,CE,_,_,_,_,_],
];

// OKTAFORGE — Steel/Psychic (#002 — John Deere security)
const OF = '#705898'; // psychic
const Os = '#B8B8D0'; // steel
const Og = '#AAAACC'; // gray shield
const Ow = '#FFFFFF';

export const OKTAFORGE_PIXELS = [
  [_,_,_,_,Os,Os,Os,Os,Os,Os,_,_,_,_,_,_],
  [_,_,_,Os,Og,Og,Og,Og,Og,Og,Os,_,_,_,_,_],
  [_,_,Os,Og,OF,OF,OF,OF,OF,OF,Og,Os,_,_,_,_],
  [_,Os,Og,OF,Ow,Ow,Ow,Ow,Ow,Ow,OF,Og,Os,_,_,_],
  [_,Os,OF,Ow,Ow,Os,Os,Os,Os,Ow,Ow,OF,Os,_,_,_],
  [Os,OF,Ow,Ow,Os,Og,Og,Og,Og,Os,Ow,Ow,OF,Os,_,_],
  [Os,OF,Ow,Ow,Os,Og,OF,OF,Og,Os,Ow,Ow,OF,Os,_,_],
  [Os,OF,Ow,Ow,Os,Og,OF,OF,Og,Os,Ow,Ow,OF,Os,_,_],
  [Os,OF,Ow,Ow,Os,Og,Og,Og,Og,Os,Ow,Ow,OF,Os,_,_],
  [_,Os,OF,Ow,Ow,Os,Os,Os,Os,Ow,Ow,OF,Os,_,_,_],
  [_,Os,Og,OF,Ow,Ow,Ow,Ow,Ow,Ow,OF,Og,Os,_,_,_],
  [_,_,Os,Og,OF,OF,OF,OF,OF,OF,Og,Os,_,_,_,_],
  [_,_,_,Os,Og,Og,Og,Og,Og,Og,Os,_,_,_,_,_],
  [_,_,_,_,Os,Og,Og,Og,Og,Os,_,_,_,_,_,_],
  [_,_,_,_,_,Os,Og,Og,Os,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,Os,Os,_,_,_,_,_,_,_,_],
];

// PIXELDEX — Normal/Fairy (#003 — this portfolio)
const XIV = '#EE99AC'; // fairy pink
const XIn = '#A8A878'; // normal
const XIw = '#FFFFFF';
const XIg = '#888888';

export const PIXELDEX_PIXELS = [
  [_,_,_,XIV,XIV,XIV,XIV,XIV,XIV,_,_,_,_,_,_,_],
  [_,_,XIV,XIw,XIw,XIw,XIw,XIw,XIw,XIV,_,_,_,_,_,_],
  [_,XIV,XIw,XIV,XIV,XIV,XIV,XIV,XIV,XIw,XIV,_,_,_,_,_],
  [XIV,XIw,XIV,XIn,XIn,XIn,XIn,XIn,XIn,XIV,XIw,XIV,_,_,_,_],
  [XIV,XIw,XIV,XIn,XIw,XIw,XIw,XIw,XIn,XIV,XIw,XIV,_,_,_,_],
  [XIV,XIw,XIV,XIn,XIw,XIV,XIw,XIV,XIn,XIV,XIw,XIV,_,_,_,_],
  [XIV,XIw,XIV,XIn,XIw,XIw,XIw,XIw,XIn,XIV,XIw,XIV,_,_,_,_],
  [XIV,XIw,XIV,XIn,XIn,XIn,XIn,XIn,XIn,XIV,XIw,XIV,_,_,_,_],
  [_,XIV,XIw,XIV,XIV,XIV,XIV,XIV,XIV,XIw,XIV,_,_,_,_,_],
  [_,_,XIV,XIw,XIw,XIw,XIw,XIw,XIw,XIV,_,_,_,_,_,_],
  [_,_,_,XIV,XIV,XIg,XIg,XIV,XIV,_,_,_,_,_,_,_],
  [_,_,_,_,XIg,XIg,XIg,XIg,_,_,_,_,_,_,_,_],
  [_,_,_,_,XIg,XIV,XIV,XIg,_,_,_,_,_,_,_,_],
  [_,_,_,XIV,XIV,XIV,XIV,XIV,XIV,_,_,_,_,_,_,_],
  [_,_,XIV,XIV,XIV,XIV,XIV,XIV,XIV,XIV,_,_,_,_,_,_],
  [_,XIV,XIV,XIV,_,_,_,_,XIV,XIV,XIV,_,_,_,_,_],
];

// HELIXTRACE — Dragon/Electric (#007 — distributed tracing)
const HT = '#7038F8'; // dragon
const HE = '#F8D030'; // electric
const Ht = '#9966FF'; // light dragon

export const HELIXTRACE_PIXELS = [
  [_,_,HE,HE,_,_,_,_,_,_,HE,HE,_,_,_,_],
  [_,HE,HT,HT,HE,_,_,_,HE,HT,HT,HE,_,_,_,_],
  [HE,HT,Ht,HT,HT,HE,_,HE,HT,HT,Ht,HT,HE,_,_,_],
  [HE,HT,HT,Ht,HT,HT,HE,HT,HT,Ht,HT,HT,HE,_,_,_],
  [_,HE,HT,HT,Ht,HT,HT,HT,Ht,HT,HT,HE,_,_,_,_],
  [_,_,HE,HT,HT,Ht,HT,Ht,HT,HT,HE,_,_,_,_,_],
  [_,_,_,HE,HT,HT,HE,HT,HT,HE,_,_,_,_,_,_],
  [_,_,HE,HT,Ht,HE,HE,HE,Ht,HT,HE,_,_,_,_,_],
  [_,HE,HT,Ht,HT,HE,_,HE,HT,Ht,HT,HE,_,_,_,_],
  [HE,HT,HT,HT,HE,_,_,_,HE,HT,HT,HT,HE,_,_,_],
  [HE,HT,Ht,HE,_,_,_,_,_,HE,Ht,HT,HE,_,_,_],
  [_,HE,HT,HE,_,_,_,_,_,_,HE,HT,HE,_,_,_],
  [_,_,HE,HE,_,_,_,_,_,_,HE,HE,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
];

// VAULTSHIELD — Steel/Ghost (#008 — zero-knowledge auth)
const VS = '#705898'; // ghost
const Vs = '#B8B8D0'; // steel
const Vk = '#111';
const Vg = '#9977BB';

export const VAULTSHIELD_PIXELS = [
  [_,_,_,_,Vs,Vs,Vs,Vs,Vs,Vs,_,_,_,_,_,_],
  [_,_,_,Vs,Vk,Vk,Vk,Vk,Vk,Vk,Vs,_,_,_,_,_],
  [_,_,Vs,Vk,VS,VS,VS,VS,VS,VS,Vk,Vs,_,_,_,_],
  [_,Vs,Vk,VS,Vg,Vg,Vg,Vg,Vg,Vg,VS,Vk,Vs,_,_,_],
  [Vs,Vk,VS,Vg,Vs,Vs,Vs,Vs,Vs,Vs,Vg,VS,Vk,Vs,_,_],
  [Vs,Vk,VS,Vg,Vs,Vk,Vk,Vk,Vk,Vs,Vg,VS,Vk,Vs,_,_],
  [Vs,Vk,VS,Vg,Vs,Vk,VS,VS,Vk,Vs,Vg,VS,Vk,Vs,_,_],
  [Vs,Vk,VS,Vg,Vs,Vk,VS,VS,Vk,Vs,Vg,VS,Vk,Vs,_,_],
  [Vs,Vk,VS,Vg,Vs,Vk,Vk,Vk,Vk,Vs,Vg,VS,Vk,Vs,_,_],
  [Vs,Vk,VS,Vg,Vs,Vs,Vs,Vs,Vs,Vs,Vg,VS,Vk,Vs,_,_],
  [_,Vs,Vk,VS,Vg,Vg,Vg,Vg,Vg,Vg,VS,Vk,Vs,_,_,_],
  [_,_,Vs,Vk,VS,VS,VS,VS,VS,VS,Vk,Vs,_,_,_,_],
  [_,_,_,Vs,Vk,Vk,Vk,Vk,Vk,Vk,Vs,_,_,_,_,_],
  [_,_,_,_,Vs,Vg,Vg,Vg,Vs,_,_,_,_,_,_,_],
  [_,_,_,_,_,Vs,Vs,Vs,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,Vs,_,_,_,_,_,_,_,_,_],
];

/* =============================================
   SVG COMPONENT ICONS
   ============================================= */

export const PokeballSVG = ({ size = 32, spinning = false, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className={`${className} ${spinning ? 'animate-pokeball' : ''}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Top half - red */}
    <path d="M4 16 A12 12 0 0 1 28 16 Z" fill="#CC0000" />
    <path d="M4 16 A12 12 0 0 1 28 16 Z" fill="url(#pbTopGrad)" />
    {/* Bottom half - white */}
    <path d="M4 16 A12 12 0 0 0 28 16 Z" fill="#F8F8F8" />
    {/* Outer ring */}
    <circle cx="16" cy="16" r="12" fill="none" stroke="#111" strokeWidth="2"/>
    {/* Center band */}
    <rect x="4" y="14" width="24" height="4" fill="#111"/>
    {/* Center bott circle inner */}
    <circle cx="16" cy="16" r="4" fill="#DDDDDD" stroke="#111" strokeWidth="2"/>
    <circle cx="16" cy="16" r="2" fill="#FFFFFF"/>
    {/* Highlight */}
    <ellipse cx="13" cy="11" rx="2" ry="1.5" fill="rgba(255,255,255,0.4)" transform="rotate(-20 13 11)"/>
    <defs>
      <linearGradient id="pbTopGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,100,100,0.3)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
      </linearGradient>
    </defs>
  </svg>
);

export const StarSVG = ({ size = 16, color = '#FFD700', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
    <polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6"
      fill={color} stroke="#AA8800" strokeWidth="0.5"/>
  </svg>
);

export const TypeBadge = ({ type, className = '' }) => {
  const labels = {
    cloud: 'CLOUD', backend: 'BACK-END', frontend: 'FRONT',
    security: 'SECURITY', database: 'DATA', devops: 'DEVOPS',
    system: 'SYSTEM', language: 'LANG',
    fire: 'FIRE', water: 'WATER', electric: 'ELECTRIC',
    psychic: 'PSYCHIC', steel: 'STEEL', ghost: 'GHOST',
    dragon: 'DRAGON', grass: 'GRASS', normal: 'NORMAL',
    ice: 'ICE', flying: 'FLYING', rock: 'ROCK',
    ground: 'GROUND', bug: 'BUG', poison: 'POISON',
    fighting: 'FIGHT', fairy: 'FAIRY', dark: 'DARK',
  };
  return (
    <span className={`type-badge type-${type} ${className}`}>
      {labels[type] || type.toUpperCase()}
    </span>
  );
};

export const HPBar = ({ current, max, className = '' }) => {
  const pct = Math.max(0, Math.min(100, (current / max) * 100));
  const color = pct > 50 ? 'stat-bar-green' : pct > 20 ? 'stat-bar-yellow' : 'stat-bar-red';
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-pixel-xs text-gray-400" style={{ minWidth: 20 }}>HP</span>
      <div className={`stat-bar-container flex-1`}>
        <div
          className={`stat-bar-fill ${color} animate-health-fill`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-pixel-xs text-gray-400" style={{ minWidth: 40, textAlign: 'right' }}>
        {current}/{max}
      </span>
    </div>
  );
};

export const StatBar = ({ label, value, max = 255, color = 'blue', className = '' }) => {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-pixel-xs" style={{ color: '#AAAACC', minWidth: 28, fontSize: '6px' }}>{label}</span>
      <div className="stat-bar-container flex-1">
        <div
          className={`stat-bar-fill stat-bar-${color} animate-health-fill`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-pixel-xs" style={{ color: '#CCCCFF', minWidth: 28, textAlign: 'right', fontSize: '6px' }}>{value}</span>
    </div>
  );
};

export const CursorArrow = () => (
  <span style={{ 
    display: 'inline-block',
    width: 0, height: 0,
    borderTop: '5px solid transparent',
    borderBottom: '5px solid transparent',
    borderLeft: '8px solid currentColor',
    animation: 'dialog-bounce 0.6s ease-in-out infinite',
    verticalAlign: 'middle'
  }} />
);

/* =============================================
   SPRITE MAP COMPONENT
   Map of sprite key → pixel data
   ============================================= */

export const SPRITE_MAP = {
  trainer:      TRAINER_PIXELS,
  korion:       KORION_PIXELS,
  deerebot:     DEEREBOT_PIXELS,
  professorix:  PROFESSORIX_PIXELS,
  sysrat:       SYSRAT_PIXELS,
  cloudwing:    CLOUDWING_PIXELS,
  hawkite:      HAWKITE_PIXELS,
  clinicor:     CLINICOR_PIXELS,
  oktaforge:    OKTAFORGE_PIXELS,
  pixeldex:     PIXELDEX_PIXELS,
  helixtrace:   HELIXTRACE_PIXELS,
  vaultshield:  VAULTSHIELD_PIXELS,
};

export default PixelSprite;
