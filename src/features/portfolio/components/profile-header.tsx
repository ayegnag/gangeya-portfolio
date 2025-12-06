import { USER } from "@/features/portfolio/data/user";
import { FlipSentences } from "@/registry/flip-sentences";

import { PronounceMyName } from "./pronounce-my-name";
import { VerifiedIcon } from "./verified-icon";

export function ProfileHeader() {
  return (
    <div className="screen-line-after flex border-x border-edge">
      <div className="shrink-0 border-r border-edge">
        <div className="mx-0.5 my-[3px]">
          <img
            className="size-32 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
            alt={`${USER.displayName}'s avatar`}
            src={USER.avatar}
            fetchPriority="high"
          />
        </div>

        <a
          href="https://knowindia.india.gov.in/"
          target="_blank"
          rel="noreferrer"
          className="absolute top-0 -left-px"
        >
          {/* Flag of India */}
          <svg
            className="h-8 sm:h-9"
            viewBox="0 0 9 6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Flag of India</title>
            <rect fill="#ff671f" width="9" height="2" id="rect2" x="0" y="0"/>
            <rect fill="#ffffff" width="9" height="2" id="rect4" x="0" y="2"/>
            <rect fill="#046a38" width="9" height="2" id="rect6" x="0" y="4"/>
            <g id="wheel8" transform="matrix(0.00391304,0,0,0.00391304,3.52174,2.02174)">
              <circle cx="250" cy="250" r="215" fill="none" stroke="#06038d" strokeWidth="30" id="circle1098"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(7.5,250,250)" id="circle1100"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(22.5,250,250)" id="circle1102"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(37.5,250,250)" id="circle1104"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(52.5,250,250)" id="circle1106"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(67.5,250,250)" id="circle1108"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(82.5,250,250)" id="circle1110"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(97.5,250,250)" id="circle1112"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(112.5,250,250)" id="circle1114"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(127.5,250,250)" id="circle1116"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(142.5,250,250)" id="circle1118"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(157.5,250,250)" id="circle1120"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(172.5,250,250)" id="circle1122"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(-172.5,250,250)" id="circle1124"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(-157.5,250,250)" id="circle1126"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(-142.5,250,250)" id="circle1128"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(-127.5,250,250)" id="circle1130"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(-112.5,250,250)" id="circle1132"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(-97.5,250,250)" id="circle1134"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(-82.5,250,250)" id="circle1136"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(-67.5,250,250)" id="circle1138"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(-52.5,250,250)" id="circle1140"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(-37.5,250,250)" id="circle1142"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(-22.5,250,250)" id="circle1144"/>
              <circle cx="450" cy="250" r="10" fill="#06038d" transform="rotate(-7.5,250,250)" id="circle1146"/>
              <g id="g1150">
                <path d="M 250,230 243.028,170.304 250,40 l 6.972,130.304 z m 5.176,0.681 8.716,-59.466 40.46,-124.06 -26.99,127.67 z M 260,232.68 283.81,177.495 355,68.135 295.886,184.468 Z m 4.142,3.178 37.281,-47.142 97.07,-87.208 -87.21,97.069 z M 267.32,240 315.532,204.114 431.865,145 322.505,216.19 Z m 1.999,4.824 55.856,-22.186 127.67,-26.99 -124.06,40.46 z M 270,250 329.696,243.028 460,250 329.696,256.972 Z m -0.681,5.176 59.466,8.716 124.06,40.46 -127.67,-26.99 z M 267.32,260 322.505,283.81 431.865,355 315.532,295.886 Z m -3.178,4.142 47.142,37.281 87.208,97.07 -97.069,-87.21 z M 260,267.32 295.886,315.532 355,431.865 283.81,322.505 Z m -4.824,1.999 22.186,55.856 26.99,127.67 -40.46,-124.06 z M 250,270 256.972,329.696 250,460 243.028,329.696 Z m -5.176,-0.681 -8.716,59.466 -40.46,124.06 26.99,-127.67 z M 240,267.32 216.19,322.505 145,431.865 204.114,315.532 Z m -4.142,-3.178 -37.281,47.142 -97.07,87.208 87.21,-97.069 z M 232.68,260 184.468,295.886 68.135,355 177.495,283.81 Z m -1.999,-4.824 -55.856,22.186 -127.67,26.99 124.06,-40.46 z M 230,250 170.304,256.972 40,250 170.304,243.028 Z m 0.681,-5.176 -59.466,-8.716 -124.06,-40.46 127.67,26.99 z M 232.68,240 177.495,216.19 68.135,145 184.468,204.114 Z m 3.178,-4.142 -47.142,-37.281 -87.208,-97.07 97.069,87.21 z M 240,232.68 204.114,184.468 145,68.135 l 71.19,109.36 z m 4.824,-1.999 -22.186,-55.856 -26.99,-127.67 40.46,124.06 z" fill="#06038d" id="path1148"/>
              </g>
              <circle cx="250" cy="250" r="40" fill="#06038d" id="circle1152"/>
            </g>
          </svg>
        </a>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex grow items-end pb-1 pl-4">
          <div className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-800">
            {"text-3xl "}
            <span className="inline dark:hidden">text-zinc-950</span>
            <span className="hidden dark:inline">text-zinc-50</span>
            {" font-medium"}
          </div>
        </div>

        <div className="border-t border-edge">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-3xl font-semibold">
              {USER.displayName}
            </h1>

            <VerifiedIcon
              className="size-4.5 text-info select-none"
              aria-label="Verified"
            />

            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </div>

          <div className="h-12.5 border-t border-edge py-1 pl-4 sm:h-9">
            <FlipSentences
              className="font-mono text-sm text-balance text-muted-foreground"
              variants={{
                initial: { y: -10, opacity: 0 },
                animate: { y: -1, opacity: 1 },
                exit: { y: 10, opacity: 0 },
              }}
            >
              {USER.flipSentences}
            </FlipSentences>
          </div>
        </div>
      </div>
    </div>
  );
}
