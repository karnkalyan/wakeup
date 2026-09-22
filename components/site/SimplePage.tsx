import { Header } from "./Header";
import { Footer } from "./Footer";

export function SimplePage({ title, subtitle, children }:{ title:string; subtitle?:string; children:React.ReactNode }){
 return <><Header/><main><section className="page-hero"><div className="container"><p className="kicker">WakeUp Nepal Builders Pvt. Ltd.</p><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div></section><section className="section"><div className="container prose">{children}</div></section></main><Footer/></>;
}
