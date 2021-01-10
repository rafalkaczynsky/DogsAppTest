import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Alert, RefreshControl, View} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import ProgressBar from 'react-native-progress/Bar';
import {createImageProgress} from 'react-native-image-progress';
import {clearCachedSubBreed, getSubBreedImage} from '../modules/dogs';
import {RootState} from '../modules/rootState';
import {BaseText, Container, ImageCard, MainContainer} from '../components/Core';
import Palette from '../styles/palette';
import {ScrollView} from 'react-native-gesture-handler';
import { hasData } from '../utils/utils';

const Image = createImageProgress(FastImage);

interface SubBreedsScreenProps {
  clearCachedSubBreed: (selectedBreedFromParam: string) => void;
  getSubBreedImage: (selectedBreedFromParam: string) => void;
  navigation: any;
  images: string[];
  isLoading: boolean;
  error: string;
  //..
}

const SubBreedsScreen = (props: SubBreedsScreenProps): ReactElement => {
  const [subBreedImages, setSubBreedImages] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {
    clearCachedSubBreed,
    getSubBreedImage,
    navigation,
    isLoading,
    error,
  } = props;

  useEffect(() => {
    const selectedBreedFromParam: string = navigation.getParam(
      'selectedSubBreed',
    );
    const storedImages: string[] = getStoredImagesForSubBreed(selectedBreedFromParam);

    if (!storedImages || (storedImages && !storedImages.length)) {
      getNewImagesForSubBreed(selectedBreedFromParam);
    }
  }, []);

  const handleOnRefresh = () => {
    const selectedBreedFromParam: string = navigation.getParam(
      'selectedSubBreed',
    );
    setRefreshing(true);
    clearCachedSubBreed(selectedBreedFromParam);
    getNewImagesForSubBreed(selectedBreedFromParam);
  }

  const onRefresh = useCallback(handleOnRefresh, []);

  const getNewImagesForSubBreed = (selectedBreedFromParam: string): void => {
    const getFirstSubreedImage = getSubBreedImage(selectedBreedFromParam);
    const getSecondSubreedImage = getSubBreedImage(selectedBreedFromParam);
    const errorMsg = error || 'Something went wrong';

    let newImages: string[] = [];
    Promise.all([getFirstSubreedImage, getSecondSubreedImage])
      .then((values) => {
        if (hasData(values)) {
          values.forEach((val) => {
            if (val && val.status === 'success') {
              let newImage = val.message;
              newImages = [...newImages, newImage];
            }
          });

          setSubBreedImages(newImages);
        } else {
          alert(errorMsg);
        }
        setRefreshing(false);
      })
      .catch((err) => {
        alert(errorMsg);
        setRefreshing(false);
      });
  };

  const getStoredImagesForSubBreed = (
    selectedBreedFromParam: string,
  ): string[] => {
    const images: string[] = props.images;
    const breedFull: string[] = selectedBreedFromParam.split(' ');
    const mainBreed: string = breedFull[0];
    const subBreed: string = breedFull[1];

    let storedImages: string[] = [];

    images.forEach((image: string): void => {
      if (image.includes(mainBreed) && image.includes(subBreed)) {
        storedImages.push(image);
        setSubBreedImages(storedImages);
      }
    });

    return storedImages;
  };

  const renderLoading = (): ReactElement => (
    <Container>
      <ActivityIndicator color={Palette.brand} size={'large'} />
    </Container>
  );

  const renderImages = (): ReactElement => (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {subBreedImages.map((imageUrl: any) => (
        <ImageCard>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: imageUrl,
            }}
            threshold={0}
            indicator={ProgressBar}
            indicatorProps={{
              size: 80,
              borderWidth: 0,
              color: Palette.brand,
              unfilledColor: 'rgba(200, 200, 200, 0.2)',
            }}
          />
        </ImageCard>
      ))}
      {subBreedImages.length === 0 && renderNoItemsLabel()}
    </ScrollView>
  );

  const renderNoItemsLabel = (): ReactElement => (
    <Container>
      <BaseText size={28} darkMode center>
        No images to display
      </BaseText>
    </Container>
  );

  return (
    <MainContainer>
      {isLoading && !refreshing && renderLoading()}
      {subBreedImages && renderImages()}
    </MainContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  images: state.dogs.subBreeds,
  isLoading: state.dogs.isLoadingImage,
  error: state.dogs.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  getSubBreedImage: (subBreed: string) => dispatch(getSubBreedImage(subBreed)),
  clearCachedSubBreed: (subBreed: string) =>
    dispatch(clearCachedSubBreed(subBreed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubBreedsScreen);
