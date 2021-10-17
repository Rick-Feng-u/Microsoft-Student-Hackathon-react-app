import * as React from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';

export function getDateTime(): string {
    let currentdate: Date = new Date();
    let datetime: string = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + ",  "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return datetime;
}

export type HistoryData = {
    uri: string;
    date: string;
}

const HistoryLogItem = (props: any) => {
    return (<List.Item
        title={props.date}
        description={props.uri}
        left={props => <List.Icon {...props} icon="photo" />}
    />)
};

const History = (props: any) => {
    return (
        <FlatList
            nestedScrollEnabled
            data={props.items}
            renderItem={({ item }) => <HistoryLogItem date={item.date} uri={item.uri}></HistoryLogItem>}
        />
    );
};

export default History;