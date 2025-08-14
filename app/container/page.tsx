import dynamic from "next/dynamic";

// Fix window build error
// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
const ContainerInputs = dynamic(
  () => import("../../components/container/containerInputs"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <ContainerInputs />;
}
