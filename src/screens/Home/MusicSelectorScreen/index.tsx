import {
  Image,
  SafeAreaView, ScrollView, StyleSheet, Text, View 
} from 'react-native'
import { HomeBackground } from '../../../components/UI/Backgrounds'
import { IconButton, Searchbar } from 'react-native-paper'
import { Color, FontFamily } from '../../../styles/GlobalStyles'
import React from 'react'
import axios from 'axios';
import qs from 'qs';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackType } from '../../../navigation/types'

interface MusicType {
  avatarURL: string
  name: string
  author: string
  album: string
  url: string
  id: number
  onPress?: () => void
}

interface YandexMusic {
  artists: Array<{decomposed: [number, {name: string}], name: string}>
  title: string
  albums: Array<{ id: number, title: string }>
  id: number
  coverUri: string
}

type Props = NativeStackScreenProps<AppStackType, 'MusicSelectorScreen'>;

const MusicComponent = (props: MusicType) => (
  <View style={musicStyle.mainContainer} onTouchEnd={props.onPress}>
    <Image style={musicStyle.avatarStyle} source={{ uri: props.avatarURL }} />
    <View style={musicStyle.dataContainer}>
      <Text numberOfLines={1} style={musicStyle.trackName}>{props.name}</Text>
      <Text numberOfLines={1} style={musicStyle.trackAlbum}>{props.album}</Text>
      <Text numberOfLines={1} style={musicStyle.trackAuthor}>{props.author}</Text>
    </View>
  </View>
)

const MusicSelectorScreen = (props: Props) => {
  const [searchMusicName, setSearchMusicName] = React.useState('')
  const [searchBarLoadingState, setSearchBarLoadingState ] = React.useState(false)
  const [musicList, setMusicList] = React.useState<Array<MusicType>>([])
  const [trackRequestTimeout, setTrackRequestTimeout] = React.useState<number | undefined>()
  const [currentTrack, setCurrentTrack] = React.useState<MusicType | undefined>()

  React.useEffect(() => {
    if (trackRequestTimeout) {
      clearTimeout(trackRequestTimeout)
    }
    setTrackRequestTimeout(setTimeout(getTracksFromYandexMusic, 300))
  }, [searchMusicName])

  React.useEffect(() => {
    if (!props.route.params.trackUrl) {
      setCurrentTrack(undefined)
      return
    }
    const id = props.route.params.trackUrl.split('/').splice(-1)[0]
    const data = {
      'track-ids': id,
      'with-positions': false
    }
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    axios.post('https://api.music.yandex.net:443/tracks/', qs.stringify(data))
      .then((data) => {
        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        const track: YandexMusic = data.data.result[0]
        console.log(track)
        let artist = track.artists[0].name
        if (track.artists[0].decomposed) {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          artist  = artist + track.artists[0].decomposed[0] + track.artists[0].decomposed[1].name
        }
        const id = track.id
        const url = `https://music.yandex.ru/album/${track.albums[0].id}/track/${id}`
        const avatarURL = `https://${track.coverUri.slice(0, -2)}150x150`
        const formedTrack: MusicType = ({
          album: track.albums[0].title,
          author: artist,
          name: track.title,
          id: id,
          url: url,
          avatarURL: avatarURL
        })
        setCurrentTrack(formedTrack)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [props.route.params.trackUrl])

  const getTracksFromYandexMusic = () => {
    if (searchMusicName.length < 3) {
      if (searchMusicName === '' && musicList.length !== 0) {
        setMusicList([])
      }
      return
    }
    setTrackRequestTimeout(undefined)
    const requestParams = {
      text: searchMusicName.trim(),
      page: 0,
      type: 'track',
      nococrrect: false
    }
    setSearchBarLoadingState(true)
    axios.get('https://api.music.yandex.net:443/search', { params: requestParams })
      .then((data) => {
        const newMusicList = Array<MusicType>()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (!data.data.result.tracks) {
          setMusicList([])
          return
        }
        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        data.data.result.tracks.results.forEach((track: YandexMusic) => {
          let artist = track.artists[0].name
          if (track.artists[0].decomposed) {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            artist  = artist + track.artists[0].decomposed[0] + track.artists[0].decomposed[1].name
          }
          const id = track.id
          const url = `https://music.yandex.ru/album/${track.albums[0].id}/track/${id}`
          const avatarURL = `https://${track.coverUri.slice(0, -2)}150x150`
          newMusicList.push({
            album: track.albums[0].title,
            author: artist,
            name: track.title,
            id: id,
            url: url,
            avatarURL: avatarURL
          })
        })
        setMusicList(newMusicList)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setSearchBarLoadingState(false)
      })
  }

  const selectTrack = (music: MusicType) => {
    props.route.params.updateTrackURL(music.url)
    props.navigation.goBack()
  }

  const deleteTrack = () => {
    props.route.params.updateTrackURL('')
    props.navigation.goBack()
  }

  return (
    <SafeAreaView style={style.baseContainer}>
      <HomeBackground>
        <View style={style.contentContainer}>
          <Searchbar
            placeholder='find friend by id'
            placeholderTextColor={Color.silver}
            cursorColor={Color.silver}
            value={searchMusicName}
            onChangeText={setSearchMusicName}
            style={style.searchContainerStyle}
            loading={searchBarLoadingState}
          />
          <ScrollView>
            {
              musicList.length != 0 ?
                musicList.map((music, _index) => (
                  <MusicComponent
                    key={music.id}
                    {...music}
                    onPress={() => selectTrack(music)}
                  />
                )) : ''
            }            
          </ScrollView>
          {
            currentTrack &&
            <View style={musicStyle.currentTrackContainer}>
              <Image style={musicStyle.avatarStyle} source={{ uri: currentTrack.avatarURL }} />
              <View style={musicStyle.dataContainer}>
                <Text numberOfLines={1} style={musicStyle.trackName}>{currentTrack.name}</Text>
                <Text numberOfLines={1} style={musicStyle.trackAlbum}>{currentTrack.album}</Text>
                <Text numberOfLines={1} style={musicStyle.trackAuthor}>{currentTrack.author}</Text>
              </View>
              <IconButton icon={'delete-outline'} size={30} onPress={deleteTrack} />
            </View>
          }
        </View>
      </HomeBackground>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  baseContainer: {
    backgroundColor: '#313131',
    flex: 1,
  },
  searchContainerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 0.5,
    borderColor: Color.darkgray,
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    padding: 10,
    flex: 1
  }
})

const musicStyle = StyleSheet.create({
  avatarStyle: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  mainContainer: {
    marginBottom: 10,
    width: '100%',
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataContainer: {
    flexDirection: 'column',
    flex: 1
  },
  trackName: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: FontFamily.poppinsMedium,
    color: Color.textColor,
  },
  trackAuthor: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    color: Color.textColor,
  },
  trackAlbum: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
    color: Color.textColor
  },
  currentTrackContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(100, 100, 100, 1)',
    borderRadius: 15,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
  }
})

export default MusicSelectorScreen