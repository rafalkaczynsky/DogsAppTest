import React, {ReactElement, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {getSubBreedImage} from '../modules/dogs';
import {RootState} from '../modules/rootState';

interface SubBreedsScreenProps {
  getSubBreedImage: (selectedBreedFromParam: string) => void;
  navigation: any;
  images: string[];
  isLoading: boolean;
  //..
}

const SubBreedsScreen = (props: SubBreedsScreenProps): ReactElement => {
  const [subBreedImages, setSubBreedImages] = useState([]);

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

    images.forEach((image: string) => {
      if (image.includes(mainBreed) && image.includes(subBreed)) {
        storedImages.push(image);
        setSubBreedImages(storedImages);
      }
    });

    return storedImages;
  };

  if (props.isLoading) {
    return <ActivityIndicator color={'black'} size={'large'} />;
  }

  return (
    <View>
      {subBreedImages.length > 0 &&
        subBreedImages.map((imageUrl) => (
          <Image
            style={{width: 100, height: 100}}
            source={{
              uri: imageUrl,
            }}
          />
        ))}
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  images: state.dogs.subBreeds,
  isLoading: state.dogs.isLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
  getSubBreedImage: (subBreed: string) => dispatch(getSubBreedImage(subBreed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubBreedsScreen);

const styles = StyleSheet.create({
  //..
});
