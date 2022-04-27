import { useRouter } from "next/router";
import { Layout } from "../../layouts/core/";
import { Bird } from "../../common/components";
import { useGetBirdsByIPCountryCodeQuery } from "../../common/services/birds.js";

export default function Songs() {
  const { data, error, isLoading } = useGetBirdsByIPCountryCodeQuery();
  const router = useRouter();
  const id = router.asPath.split("/").pop();

  if (isLoading) {
    return <Bird img="" name="" />;
  }

  const bird = data.results.filter((bird) => Number(bird.key) == id)[0];

  return (
    <Layout>
      <Bird img={bird.media[0].identifier} name={bird.scientificName} />
    </Layout>
  );
}
