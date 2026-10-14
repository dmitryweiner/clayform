# [ClayForm](https://dmitryweiner.github.io/clayform/)

**English** · [Русский](README.ru.md)

<img width="764" height="806" alt="image" src="https://github.com/user-attachments/assets/7cbe3f8b-d9f2-4173-808c-dbaf40e35ade" />

**Clay pottery and the molds to cast it — from parameters to STL.**
A web app: pick a typical shape, turn its dimensions in millimetres, add
relief and roulette patterns — and get either a file to print in clay or the
tooling for slip casting.

A geometric relative of [MathSculpt](../mathsculpt/), but about pottery
rather than mathematical surfaces: the parameters are called “neck”, “belly”
and “base”, the sizes are real, and what comes out can be cast.

## What it does

**Four shape families** after historical references — pot (krynka,
korchaga, teapot), bowl (plate, piala, kylix), cup (mug, skyphos) and vase
(amphora, jug, krater, lekythos). Each has its own parameters: neck, belly,
mouth and base diameters, belly height, shoulder sharpness, rim flare, foot
height.

Every shape has a **base fillet** — the radius of the edge where the wall or
foot meets the base — and the bowl and vase also have a **foot fillet**, the
radius of the transition from foot to body. A sharp edge chips, ceramics
crack in a sharp inner corner, and clay will not release from a sharp corner
of the mold.

The bowl also sets the angle at which the wall leaves the base: 0 is auto (as
the roundness dictates, a shelf from the foot), more makes the wall a Bézier
curve leaving the foot edge at that angle and reaching the rim by the
roundness.

The stated diameter is the diameter of the finished piece. The silhouette is
interpolated with cubic Hermite splines and the Fritsch–Carlson limiter: a
plain spline overshoots the control points by 5–10 %, and a “180 mm belly”
turns into 190.

**Relief** — a wave along the height, around the axis or in a spiral, in four
shapes (sine, triangle, square, half-round ridges). Depth in millimetres, a
zone of effect along the height. The spiral pitch is fractional: per turn the
wave argument grows by freq × pitch, and the seam closes when the product is
whole — with 16 crests, pitches in multiples of ¹⁄₁₆ work.

**A second wave** combines with the first in two ways. *Weave* is the
product of the waves: one runs around, the other along the height, giving
basketry or a waffle. *Modulation* lets the second wave bend the first,
shifting its crests and changing their depth; stranger and richer.

**Roulette** — a stamping wheel rolled along a band: plain band, rope, Greek
key, zigzag, dots, diamonds, notches, lattice — or **your own image**. Up to
four bands, each with its own pattern, height and depth, as on real pottery.
A whole number of impressions always fits in one turn, so there is no
half-impression at the join.

Continuous patterns (band, rope, zigzag, lattice, Greek key) run as an
unbroken ribbon. For discrete ones (dots, diamonds, notches, image) an
element is a square as wide as the band, and the gap between impressions is
set in millimetres: the number of impressions is chosen automatically, and
the rounding goes to the gap, not to the element.

The Greek key comes in six kinds: classic key, framed key, two-and-a-half
turn spiral, hooks, T-teeth and square wave. Line and gap always follow the
grid exactly, and the band width sets the pattern height. Each kind is
described by an ASCII grid, so new variants are added as lines of text.

An image ornament is any file, scaled down to 64 pixels on its long side in
greyscale: white is full depth, black is the plain wall, and the invert
switch swaps them. Proportions are kept, and the band width sets the image
height. The image lives right in the state and travels with the link.
Detail finer than the mesh step is invisible in the preview — raise the
resolution for export.

Element shapes are computed in millimetres, not in tile fractions. A dot is
the print of a ball: the ball radius follows from the footprint and the
depth, so a shallow dimple comes out gentle rather than a squashed hemisphere
with a crater rim. A Greek key line is equally thick along and across even on
a stretched band.

**Handle and spout.** The handle is an arc in the parting plane of the mold,
one or two (amphora); the attachment angles at the top and bottom set how it
leaves the wall.

There are two kinds of spout. A *pulled lip*, as on a krynka: the cavity
follows it, so the pour is a channel rather than a solid lump of clay. A
*tubular* one, as on a teapot: an applied tube arcing from the wall to the
tip, with attachment height, length, diameters at the base and the tip, and
the cut angle. In a solid positive (master, tooling) the tube is solid — slip
casting makes the spout hollow anyway. In the STL of the piece itself a real
channel is cut through the wall, with walls as thick as the body, and the tip
is opened.

Relief and roulette go onto the body of revolution **before** it is united
with the handle and spout, so the applied parts stay smooth. That is on
purpose: a pattern running onto the handle would not release from a split
mold — it would cross the parting plane at an angle.

**The lid** is a body of revolution with a dome, a skirt and a knob (a ball
on a stem, which can be flattened into an ellipse, or a T). The dome gets its
own roulette, and the body's waves follow with the “On the lid too” switch.
All seat diameters are derived from the mouth of the piece, so the lid always
fits; it can rest on the rim or sink onto a gallery inside the mouth. It is
exported as a separate file — or, with “Lid alongside”, in one file with the
piece, skirt down, to print in one go.

**The rim edge** is smoothed with a radius, as a potter does with a finger:
the wall is cut lower under the edge and an arc makes up the top, so the
height stays exactly as set. Zero gives the flat cut of a raw edge.

**Four export modes:**

| Mode | What you get |
|---|---|
| Piece | a hollow vessel with the set wall — to print in clay |
| Master | a positive with a casting spare — for a hand-made silicone mold |
| Mold boxes | printed boxes to pour silicone into, one per mold part |
| Press molding | a slump mold shell and its plunger in one file: the slab is pressed inside, the relief ends up outside |

Press molding is available for a body without a handle, spout or lid. The
mold and the plunger are printed as shells as thick as the “Wall” — only the
surface the slab touches, no solid block. If the piece will not come out of
the mold, the app warns you.

The slump mold comes with a **plunger** — the matching part that presses
the slab to the mold to exactly its thickness (“Slab”). Under its rim the
mold has three lugs with slots, the plunger has three short hooked legs, and
the mold floor has a vent. The workflow: lay the slab on the mold and press
it in by hand; trim any overhang beyond the rim longer than a centimetre —
shorter overhang will lie between the wall and the legs. Then seat the
plunger until its legs rest on the lugs: the lips of the legs hug the lugs
from outside and centre the plunger, and the soles on the lugs set the
thickness of the wall and the base. The plunger bottom is rounded (“Bottom
rounding”: 100 % — a cap from the axis, nearly a hemisphere in a bowl; 0 — a
flat floor): in the centre the base comes out exactly one slab thick,
thicker towards the wall, like a piala with a heavy foot. Under the lugs the
mold has ribs down to its base (for a bowl), which help it stand; they print
without supports. Remove the plunger (the vent along its axis keeps it from
sticking by suction) and trim the slab edge along the rim. The mold and the
plunger lie side by side in one STL; if both do not fit the printer bed,
“split into parts” in the slicer and print them one at a time.

**A recessed lid in a casting mold** gets a **spare plug** — a separate
part that goes into the mouth from above and casts the gallery for the lid:
the plaster of the halves cannot reach there. The plug comes off first,
upwards; it also holds the sprue.

**The app chooses the parting scheme itself.** A bowl lifts straight out — a
one-piece mold. A pot's neck is narrower than its belly — two halves with
keys. A wide flat base adds a separate base section. The analyser counts
undercuts by the normals and explains its choice in words, and if the relief
locks the mold, it warns you and says what exactly is wrong with it.

**The heavy lifting is done by a worker.** Boolean operations (the manifold
WASM module) live in a separate thread: the main one never loads it. Exporting
mold boxes at the highest resolution takes seconds — the tab does not freeze,
and a bar at the bottom shows which stage is running.

It also keeps the preview honest. While you drag a slider, the handle and
spout are drawn as separate bodies — fast and, from outside, identical to the
union. Once you stop, the picture is replaced by the real assembly: with the
handle ends trimmed on the inside and a through spout. What is on screen is
what goes into the STL.

**Presets** — built-in, your own (in the browser, “Piece N” by default; each
has a 🗑 in the list) and as files: 📂 opens a JSON (you can also drop it onto
the window), ⬇️ saves the current state to `clayform-<name>.json`. The 🔗
link carries the whole state.

**The interface is in English and Russian.** The language comes from the
browser settings (Russian if it is listed before English, English for
everyone else), and the “RU” / “EN” button in the top bar switches it in
place, keeping the piece and the undo history. The choice is remembered.

**On a phone** the panel is a bottom sheet over the model: tapping the model
hides it, the “⚙ Settings” button at the bottom brings it back. Long builds
show a progress bar right on the model.

The full casting workflow is described (in Russian) in
[slip_casting_mold_workflow.md](slip_casting_mold_workflow.md).

## Development

```bash
npm install
npm run dev       # vite
npm run check     # tsc + eslint + vitest (398 tests)
npm run smoke     # browser smoke; --preview for the production build, --res 384 for export, --slow for the progress bar
npm run build     # production build → ./dist; GH Actions publishes it to Pages
```

A screenshot in a given state:

```bash
node scripts/snap.mjs --out shots/x.png --view --family vase --lang en \
     --check on_roulette --set roul0_pattern=lattice --set roul0_depth=1.5
```

Golden tests pin the geometry of the families; regenerate them deliberately:
`UPDATE_GOLDEN=1 npx vitest run tests/golden.test.ts`.

## Layout

```
src/geo/       pure geometry core, no Three.js, in millimetres
  profiles     family silhouettes: parameters → r(t)
  relief       the wave and the wave of a wave
  roulette     roulette patterns on a tile
  build        silhouette → lathe mesh → relief → mesh
  hollow       the cavity for direct printing
  handle       handle: a section swept along a Bézier arc
  spout        spout: pulled lip and applied tube with a channel
  attach       shared by applied parts: sinking an end into the wall
  csg          bridge to manifold-3d (WASM) for boolean operations
  assemble     body ∪ handles ∪ spout, and the same minus cavity and channel
  message      messages to the user as codes — the core knows no language
  mold/        undercut analysis, blocks, master, mold boxes
src/state/     state, sanitising, presets, links, history
src/worker/    protocol, the CSG worker and its client
src/i18n/      ru (reference) and en dictionaries, language, templates
src/ui/        cards, controls, silhouette graph
src/render/    a thin Three.js layer
```

The invariants everything rests on:

- **`src/geo/` knows nothing of Three.js** — the same separation as in mathsculpt.
- **Everything coming from outside goes through `sanitizeState`.** The core
  may assume valid parameters; a person may have edited the link. The worker
  boundary is “outside” too: it sanitises the incoming state again.
- **`src/main.ts` knows nothing of WASM.** Not a single import path from the
  main thread leads to `geo/csg.ts` — which is why `geo/mold` is imported
  there by submodules (`mold/analyze`, `mold/state`), not through the facade.
- **Visible text goes only through the dictionaries.** The core and the worker
  speak in message codes; a test fails on any Cyrillic string literal outside
  `src/i18n/ru.ts`.

The model axis is z, the base of the piece at z = 0. The mold parting plane
is XZ (y = 0), and the handle and spout must lie in it, or a two-part mold
would not come off.

## License

MIT
