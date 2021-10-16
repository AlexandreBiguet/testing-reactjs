import { useContext } from "react";
import MeetupList from "../components/meetup/MeetupList";
import FavoritesContext from "../store/favorites-context";

function FavoritesPage() {
  const favoriteCtx = useContext(FavoritesContext);

  let content;

  if (favoriteCtx.totalFavorites === 0) {
    content = <p> No favorites, start adding! </p>;
  } else {
    content = <MeetupList meetups={favoriteCtx.favorites} />;
  }

  return (
    <section>
      <h1> My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;
