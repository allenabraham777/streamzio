import { getAllStreams } from '@/services/stream';
import Streams from './_component/streams';

const Home = async () => {
    const streams = await getAllStreams();
    return (
        <main className="max-2xl h-full p-10 flex flex-col gap-4">
            <h1 className="text-xl">
                <b className="text-primary">Channels</b> we think you’ll like
            </h1>
            <Streams streams={streams} />
        </main>
    );
};

export default Home;
