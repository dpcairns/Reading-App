import React from 'react';
import { useEffect, useState } from 'react';
// import Home from './Home';

import { deleteFromLibrary } from './services/supabase';
import LibraryList from './LibraryList';
import { getLibraryBooks } from './services/supabase';

export default function Library() {
  const [library, setLibrary] = useState([]);
  const [updatedLibrary, setUpdatedLibrary] = useState(false);

  async function handleDelete(id) {
    await deleteFromLibrary(id);
  }

  async function fetchFavorites() {
    const myFavorites = await getLibraryBooks();
    const filteredFavorites = myFavorites.map((book) => {
      return {
        title: book.stories.title,
        author: book.stories.author,
        id: book.stories.id,
        image: book.stories.image,
        // is_read: book.story_junction_two.is_read,
      };
    });
    setLibrary(filteredFavorites);
  }

  useEffect(() => {
    fetchFavorites();
    // this should fetch on mount as well, so i don't think we need 2 useEffects
  }, [updatedLibrary]);

  // async function handleClick() {

  //   const deletedStory = await deleteFromLibrary(id);

  //   setUpdatedLibrary(deletedStory);

  // }
  return (
    <div>
      <LibraryList
        library={library}
        fetchFavorites={fetchFavorites}
        handleDelete={handleDelete}
        updatedLibrary={updatedLibrary}
        setUpdatedLibrary={setUpdatedLibrary}
      />
    </div>
  );
}
