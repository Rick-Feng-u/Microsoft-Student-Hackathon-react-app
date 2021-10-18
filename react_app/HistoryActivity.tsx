import * as React from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';

export function getDateTime(): string {
    let currentdate: Date = new Date();
    let datetime: string = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1).toString().padStart(2, '0') + "/"
        + currentdate.getFullYear().toString().padStart(2, '0') + ",  "
        + currentdate.getHours().toString().padStart(2, '0') + ":"
        + currentdate.getMinutes().toString().padStart(2, '0') + ":"
        + currentdate.getSeconds().toString().padStart(2, '0');
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
        left={props => <List.Icon {...props} icon="panorama" />}
    />)
};

const History = (props: any) => {
    const [log, addLogItem] = React.useState(new Array<HistoryData>());

    function logItem(item: HistoryData) {
        addLogItem(log.concat(item));
    }

    return (
        <FlatList
            nestedScrollEnabled
            data={props.items}
            renderItem={({ item }) => <HistoryLogItem date={item.date} uri={item.uri}></HistoryLogItem>}
        />
    );
};

export default History;