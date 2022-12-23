import React from 'react';
import {ListRenderItem, StyleSheet} from 'react-native';
import {Separator, StyledFlatlist} from './style';

interface NewsFlatlistProps {
  refreshing: boolean;
  onRefresh: Function;
  data: any;
  renderItem: ListRenderItem<any>;
}

export const NewsFlatlist: React.FC<NewsFlatlistProps> = ({
  refreshing,
  onRefresh,
  data,
  renderItem,
}) => {
  return (
    <StyledFlatlist
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={styles.flatlistContainer}
      data={data}
      keyExtractor={(item: {id: number}) => item.id}
      ItemSeparatorComponent={() => <Separator />}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingVertical: 20,
  },
});
