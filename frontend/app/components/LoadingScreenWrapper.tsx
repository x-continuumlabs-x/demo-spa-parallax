import { readdirSync } from 'fs';
import { join } from 'path';
import LoadingScreen from './LoadingScreen';

export default function LoadingScreenWrapper() {
	// Read all images from /images/preloaded directory
    const publicDir = join(process.cwd(), 'public');
    const preloadedDir = join(publicDir, 'images', 'preloaded');
    const preloadedFiles = readdirSync(preloadedDir);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const staticImages = preloadedFiles
        .filter(file => {
            const ext = file.toLowerCase().substring(file.lastIndexOf('.'));
            return imageExtensions.includes(ext);
        })
        .map(file => `/images/preloaded/${file}`);

    // Read first 20 frames from /images/frames directory
    const framesDir = join(publicDir, 'images', 'frames');
    const frameFiles = readdirSync(framesDir);
    const frameImages = frameFiles
        .filter(file => {
            const ext = file.toLowerCase().substring(file.lastIndexOf('.'));
            return imageExtensions.includes(ext);
        })
        .sort() // Alphabetical sort
        .slice(0, 20) // First 20 frames
        .map(file => `/images/frames/${file}`);

    return <LoadingScreen staticImages={staticImages} frameImages={frameImages} />;
}
