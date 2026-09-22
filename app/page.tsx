import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Homepage } from "@/components/site/Homepage";
import { getHomeData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home(){
 const data = await getHomeData();
 return <><Header/><main><Homepage {...data}/></main><Footer/></>;
}
