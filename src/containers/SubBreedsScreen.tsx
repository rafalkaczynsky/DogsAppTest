import React, {ReactElement, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import ProgressBar from 'react-native-progress/Bar';
import {createImageProgress} from 'react-native-image-progress';
import {getSubBreedImage} from '../modules/dogs';
import {RootState} from '../modules/rootState';
import {Container, ImageCard} from '../components/Core';
import Palette from '../styles/palette';

const Image = createImageProgress(FastImage);

interface SubBreedsScreenProps {
  getSubBreedImage: (selectedBreedFromParam: string) => void;
  navigation: any;
  images: string[];
  isLoading: boolean;
  //..
}

const SubBreedsScreen = (props: SubBreedsScreenProps): ReactElement => {
  const [subBreedImages, setSubBreedImages] = useState<string[]>([]);

  useEffect(() => {
    const selectedBreedFromParam: string = props.navigation.getParam(
      'selectedSubBreed',
    );
    const storedImages = getStoredImagesForSubBreed(selectedBreedFromParam);

    if (!storedImages || (storedImages && !storedImages.length)) {
      setNewImagesForSubBreed(selectedBreedFromParam);
    }
  }, []);

  const setNewImagesForSubBreed = (selectedBreedFromParam: string): void => {
    const getFirstSubreedImage = props.getSubBreedImage(selectedBreedFromParam);
    const getSecondSubreedImage = props.getSubBreedImage(
      selectedBreedFromParam,
    );

    let newImages: string[] = [];
    Promise.all([getFirstSubreedImage, getSecondSubreedImage]).then(
      (values) => {
        values.forEach((val) => {
          if (val.status === 'success') {
            let newImage = val.message;
            newImages = [...newImages, newImage];
          }
        });

        setSubBreedImages(newImages);
      },
    );
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

  const renderLoading = () => (
    <ActivityIndicator color={Palette.brand} size={'large'} />
  );

  const renderImages = () =>
    subBreedImages.map((imageUrl) => (
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
    ));

  return (
    <Container>
      {props.isLoading && renderLoading()}
      {subBreedImages.length > 0 && renderImages()}
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  images: state.dogs.subBreeds,
  isLoading: state.dogs.isLoadingImage,
});

const mapDispatchToProps = (dispatch: any) => ({
  getSubBreedImage: (subBreed: string) => dispatch(getSubBreedImage(subBreed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubBreedsScreen);
