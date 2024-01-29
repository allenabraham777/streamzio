import { getAllStreams } from '@/services/stream';
import Streams from './_component/streams';

const Home = async () => {
    const streams = await getAllStreams();
    return (
        <main className="max-2xl h-full p-10">
            <Streams streams={streams} />
        </main>
    );
};

export default Home;
