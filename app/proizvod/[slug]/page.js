import {notFound} from 'next/navigation';
import {MODELI, getModel} from '../modeli';
import ModelPage from './ModelPage';

export function generateStaticParams() {
  return MODELI.map(m => ({slug: m.slug}));
}

export function generateMetadata({params}) {
  const m = getModel(params.slug);
  if (!m) return {};
  return {title: `${m.name} ${m.type.toLowerCase()} — MADE BY ALY`, description: m.lead};
}

export default function Page({params}) {
  const model = getModel(params.slug);
  if (!model) notFound();
  return <ModelPage model={model}/>;
}
