import { GangeyaMark } from "./gangeya-mark";

export function AuthorFooter() {

  const intro = "Gangeya writes about software through the lens of experience, and enjoys building things, understanding why they work, and reflecting on what real-world experience teaches beyond frameworks and tools."
  
  return (
    <div className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before mx-auto border-x border-edge pt-4 md:max-w-3xl">
        <div className="screen-line-before screen-line-after flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex items-center justify-center gap-3 border-x border-edge bg-background p-4">
            <div className="w-24">
              <GangeyaMark/>
            </div>
            <Separator />
            <p className="font-mono text-sm text-balance text-muted-foreground">{ intro }</p>
            <Separator />
          </div>
        </div>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex w-full h-4" />
      </div>
    </div>
  );
}

function Separator() {
  return <div className="flex h-11 w-px bg-edge" />;
}
