import { ReactNode } from "react";
import { List } from "@mui/material";



/**
 * 
 * Ciekawa (i użyteczna) technika
 * związaną z programowaniem funkcyjnym
 * 
 * Komponent przewidziany dla dynamicznych list,
 *  wymagających wskaźnika czy lista 
 *  doładowuje nowe elementy, lub gdy jest pusta.
 */

type LoadingListProps<T> = {
  list: T[];
  isLoading: boolean;
  noResultsRender: ReactNode;
  loadingRender: ReactNode;
  itemRender: (data: T) => ReactNode;
};
export default function LoadingList<T extends Record<string, unknown>>({
  list,
  isLoading,
  noResultsRender,
  loadingRender,
  itemRender,
}: LoadingListProps<T>) {
  return (
    <List>
      {list.map(itemRender)}
      {isLoading ? loadingRender : null}
      {!isLoading && list.length === 0 ? noResultsRender : null}
    </List>
  );
}
