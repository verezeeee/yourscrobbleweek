import React from 'react'
import { useLastFm } from './contexts/LastFmContext'
import "./Result.css"
import { useNavigate } from 'react-router';
import html2canvas from 'html2canvas';

interface AlbumProps {
    imageUrl: string;
    size: number;
    artist: string;
    title: string;
}

const Result = () => {
    const { data, form } = useLastFm();
    const navigate = useNavigate();

    const handleShare = () => {
        //implement share functionality where when clicked the page will download an image with the grid of albums
        //use html2canvas or something like that
        const canvas = html2canvas(document.body);
        canvas.then((canvas: any) => {
            const link = document.createElement('a');
            link.download = 'your-scrobble-week.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        })
    }

    const getItems = () => {
        if (!data) return [];
        
        switch(form.method) {
            case 'user.gettopalbums':
                return data.topalbums?.album || [];
            case 'user.gettopartists':
                return data.topartists?.artist || [];
            case 'user.gettoptracks':
                return data.toptracks?.track || [];
            default:
                return [];
        }
    }

    const AlbumCover = ({ imageUrl, size, artist, title }: AlbumProps) => {
        return (
            <img src={imageUrl} alt={title} width={size} height={size} />
        )
    }

    const items = getItems();
    const gridSize = Math.sqrt(Number(form.limit));

    return (
        <main>
            <h1>Aqui está sua scrobble week!😁</h1>

            <div className={`result-container grid-${gridSize}`}>
                {items.map((item: any, index: number) => (
                    <AlbumCover
                        imageUrl={item.image[2]['#text']}
                        size={Number(item.image[2].size?.split('x')[0]) || 174}
                        artist={typeof item.artist === 'string' ? item.artist : item.artist.name}
                        title={item.name}
                        key={index}
                    />
                ))}
            </div>
            {/* <button onClick={handleShare} className='button'>Share</button> */}
            <button onClick={() => navigate(-1)} className='button'>Voltar</button>
        </main>
    )
}

export default Result