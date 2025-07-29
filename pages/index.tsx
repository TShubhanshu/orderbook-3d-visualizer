// import Head from 'next/head';
// import dynamic from 'next/dynamic';
// import { ControlPanel } from '../components/ControlPanel';

// const ThreeScene = dynamic(() => import('../components/ThreeScene').then(mod => mod.ThreeScene), {
//   ssr: false,
// });

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>Orderbook Depth 3D Visualizer</title>
//       </Head>
//       <main className="flex h-screen bg-black text-white">
//         <ControlPanel />
//         <div className="flex-1">
//           <ThreeScene />
//         </div>
//       </main>
//     </>
//   );
// }

import Head from 'next/head';
import dynamic from 'next/dynamic';
import { ControlPanel } from '../components/ControlPanel';

const Orderbook = dynamic(() => import('../components/Orderbook').then(mod => mod.Orderbook), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Orderbook Depth 3D Visualizer</title>
      </Head>
      <main className="flex h-screen bg-black text-white">
        <ControlPanel />
        <Orderbook />
      </main>
    </>
  );
}




// import Head from 'next/head';
// import dynamic from 'next/dynamic';
// import { ControlPanel } from '../components/ControlPanel';

// const ThreeScene = dynamic(() => import('../components/ThreeScene'), { ssr: false });

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>Orderbook Depth 3D Visualizer</title>
//       </Head>
//       <main className="flex h-screen bg-black text-white">
//         <ControlPanel />
//         <div className="flex-1">
//           <ThreeScene />
//         </div>
//       </main>
//     </>
//   );
// }