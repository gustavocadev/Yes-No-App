import { Handlers, PageProps } from "$fresh/server.ts";
import type { Answer } from "./types/Answer.ts";

const getAnswer = async () => {
  const resp = await fetch("https://yesno.wtf/api");
  const answer = await resp.json() as Answer;
  return answer;
};

export const handler: Handlers = {
  async POST(req, ctx) {
    const formData = await req.formData();
    const question = formData.get("question") as string;
    console.log(question);

    if (!question.includes("?")) {
      return ctx.render(null);
    }

    return ctx.render(await getAnswer());
  },
};

export default function Page({ data }: PageProps<Answer | null>) {
  return (
    <>
      <div class="mx-auto relative w-full h-screen flex flex-col text-white">
        <figure class="h-full w-full absolute z-10">
          <img
            src={data?.image}
            alt="Imagen Gif random"
            class="h-full w-full"
          />
        </figure>
        {/* Overlay */}
        <div class="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-[0.4] z-20">
        </div>

        {/* Form */}
        <form
          class="flex flex-col max-w-lg mx-auto  items-center justify-center px-4 py-16 relative gap-2 z-30"
          method="post"
        >
          <input
            type="text"
            class="px-3 py-3 rounded w-full bg-gray-900 text-white outline-none"
            placeholder="Your Question"
            autocomplete="off"
            name="question"
          />
          <span class="text-xl font-semibold relative">
            Remenber to finish with a sign of interrogaton (?)
          </span>
        </form>

        <section class="flex flex-col items-center justify-center relative z-30">
          {data?.answer && (
            <p class="text-7xl uppercase font-bold">
              {data?.answer}!
            </p>
          )}
        </section>
      </div>
    </>
  );
}
