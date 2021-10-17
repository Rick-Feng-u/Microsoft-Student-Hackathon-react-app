/* eslint-disable prettier/prettier */

import React from 'react';
import axios, { CancelTokenSource } from 'axios';
import { NavigationBar } from './NavigationBar';
import {View} from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';

interface IPost {
  brand_name: string;
  ethical_rating: string;
  logo: string;
  overall_rating: number;
  parent_company: string;
  photo: string;
} 

const defaultPosts:IPost[] = [];

const App = () => {
  const navBar = <NavigationBar></NavigationBar>;

  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(
    defaultPosts
  );

  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] = React.useState(
    ''
  );

  const cancelToken = axios.CancelToken; //create cancel token
  const [cancelTokenSource, setCancelTokenSource]: [
    CancelTokenSource,
    (cancelTokenSource: CancelTokenSource) => void
  ] = React.useState(cancelToken.source());

  React.useEffect(() => {
    axios
      .get<IPost[]>('https://rutlandpython3.azurewebsites.net/api/brandsearch', {
        cancelToken: cancelTokenSource.token,
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
        params: {
          photo: 'BASE64STRING'
        },
      }
      )
      
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((ex) => {
        let error = axios.isCancel(ex)
          ? 'Request Cancelled'
          : ex.code === 'ECONNABORTED'
          ? 'A timeout has occurred'
          : ex.response.status === 404
          ? 'Resource Not Found'
          : 'An unexpected error has occurred';

        setError(error);
        setLoading(false);
      });
  }, []);

  const brand_name = posts.brand_name;
  const ethical_rating = posts.ethical_rating;
  const logo = posts.logo;
  const overall_rating = posts.overall_rating;
  const parent_company = posts.parent_company;
  const photo = posts.photo;
  const site_name = posts.site_ratings[0].site_name;
  const site_rateing = posts.site_ratings[0].site_rating;
  const sources_name = posts.sources[0].name;
  const sources_url = posts.sources[0].url;

  return (
    <>
    <Text>
      {brand_name}
    </Text>
      {navBar}
    </>
  );

};

export default App;
