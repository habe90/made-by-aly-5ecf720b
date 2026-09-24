import './globals.css';
import SiteBrand from './components/SiteBrand';

export const metadata = {
  title: 'MADE BY ALY — Skromnost u svakom koraku',
  description: 'Premium moda za pokrivene žene. Haljine, abaje i khimari koji spajaju skromnost, udobnost i bezvremensku eleganciju.'
};

export default function RootLayout({ children }) {
  return <html lang="bs"><body><SiteBrand/>{children}</body></html>;
}
