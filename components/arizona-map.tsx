import { cn } from "./ui";

// Simplified Arizona border as [longitude, latitude], clockwise from the NW corner.
const border: [number, number][] = [
  [-114.05, 37.0], [-109.05, 37.0], [-109.05, 31.33], [-111.07, 31.33],
  [-114.81, 32.49], [-114.72, 32.72], [-114.47, 32.84], [-114.53, 33.03],
  [-114.7, 33.41], [-114.72, 33.7], [-114.5, 33.95], [-114.43, 34.1],
  [-114.13, 34.27], [-114.38, 34.46], [-114.63, 34.87], [-114.63, 35.1],
  [-114.57, 35.2], [-114.68, 35.5], [-114.65, 35.85], [-114.75, 36.07],
  [-114.5, 36.15], [-114.05, 36.19],
];

const cities: { name: string; at: [number, number]; anchor?: "start" | "end" }[] = [
  { name: "Flagstaff", at: [-111.65, 35.2] },
  { name: "Prescott", at: [-112.47, 34.54], anchor: "end" },
  { name: "Phoenix", at: [-112.07, 33.45] },
  { name: "Tucson", at: [-110.97, 32.22] },
  { name: "Yuma", at: [-114.62, 32.69] },
];

const northwestValley: [number, number] = [-112.33, 33.63];

// Equirectangular projection, corrected for Arizona's latitude.
const SCALE = 58;
const PAD = 14;
const LON0 = -114.82;
const LAT0 = 37.0;
const KX = Math.cos((34 * Math.PI) / 180);

function project([lon, lat]: [number, number]) {
  return [PAD + (lon - LON0) * KX * SCALE, PAD + (LAT0 - lat) * SCALE] as const;
}

const outline =
  border.map((p, i) => `${i ? "L" : "M"}${project(p).map((n) => n.toFixed(1)).join(" ")}`).join(" ") + "Z";
const [width] = project([-109.05, 37]);
const [, height] = project([-111, 31.33]);

export function ArizonaMap({ className }: { className?: string }) {
  const [nx, ny] = project(northwestValley);
  return (
    <svg
      viewBox={`0 0 ${(width + PAD).toFixed(0)} ${(height + PAD).toFixed(0)}`}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-labelledby="az-map-title"
    >
      <title id="az-map-title">
        Map of Arizona highlighting the Northwest Valley, Providence Estate Builders&apos; home base
      </title>
      <path d={outline} className="fill-gold/[0.06] stroke-gold/70" strokeWidth={1.25} strokeLinejoin="round" />

      {/* Greater Phoenix coverage */}
      <circle cx={nx + 12} cy={ny + 4} r={38} className="fill-gold/10 stroke-gold/30" strokeDasharray="3 4" />

      {cities.map(({ name, at, anchor = "start" }) => {
        const [x, y] = project(at);
        if (name === "Phoenix") return null;
        return (
          <g key={name} className="fill-mist">
            <circle cx={x} cy={y} r={2} />
            <text
              x={anchor === "end" ? x - 6 : x + 6}
              y={y + 3.5}
              textAnchor={anchor}
              className="text-[10px] tracking-wide"
            >
              {name}
            </text>
          </g>
        );
      })}

      {/* Home base */}
      <circle
        cx={nx}
        cy={ny}
        r={9}
        className="fill-gold/40 [transform-box:fill-box] [transform-origin:center] motion-safe:animate-ping"
      />
      <circle cx={nx} cy={ny} r={5} className="fill-gold-light stroke-ink" strokeWidth={1.5} />
      <text x={nx + 12} y={ny - 10} className="fill-gold-light text-[11px] font-semibold tracking-[0.12em] uppercase">
        Northwest Valley
      </text>
      <text x={nx + 12} y={ny + 30} className="fill-mist text-[10px] tracking-wide">
        Phoenix metro
      </text>
    </svg>
  );
}
