import { useEffect, useState } from 'react'
import type { Flashcard } from '../types';
import { useParams } from 'react-router-dom';
import { flashcardService } from '../services/flashcardService';
import { Loader } from '../components/ui/Loader';
import { FlashcardComponent } from '../components/ui/FlashcardComponent';


export const DeckDetailsPage = () => {
  const { id } = useParams();
  
  const [error, setError] = useState<string | null>(null);

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const response = await flashcardService.getByDeck(Number(id), 1, 5);
        
        setFlashcards(response.data);
        setHasMore(response.current_page < response.last_page);
      } catch (err) {
        setError("Erro ao carregar pasta");
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitial();
  }, [id]);

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    try {
      const nextPage = page + 1;

      const res = await flashcardService.getByDeck(Number(id), nextPage, 5);

      setFlashcards((prev) => [...prev, ...res.data]);
      setPage(nextPage);
      setHasMore(res.current_page < res.last_page);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <div className="p-6 bg-black min-h-screen">
        <p className="text-red-400 text-sm">
          {error || "Pasta não encontrada"}
        </p>
      </div>
    );
  }
  return (
    <FlashcardComponent
      front="Comment ça va?"
      back="How are you?"
    />
  )
}
