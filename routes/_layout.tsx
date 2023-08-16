import { defineLayout } from "$fresh/src/server/defines.ts";

export default defineLayout((req, ctx) => {
  return (
    <main class="bg-[#86efac]">
      <ctx.Component />
    </main>
  );
});
