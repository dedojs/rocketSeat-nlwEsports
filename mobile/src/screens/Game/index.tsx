import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Background } from '../../componentes/Background';
import { Entypo } from '@expo/vector-icons';
import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { THEME } from '../../theme';
import { Heading } from '../../componentes/Heading';
import { DuoCard, DuoCardsProps } from '../../componentes/DuoCard';
import { useEffect, useState } from 'react';
import { DuoMatch } from '../../componentes/DuoMatch';

export function Game() {

  const [duos, setDuos] = useState<DuoCardsProps[]>([]);
  const [discordSelected, setDiscordSelected] = useState('');

  const navigation = useNavigation();
  const route = useRoute()
  const game = route.params as GameParams;

  const hangleGoBack = () => {
    navigation.goBack();
  }

  const getDiscordUser = async (adsId: string) => {
    fetch(`http://10.0.0.112:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDiscordSelected(data.discord))
  }

  

  useEffect(() => {
    fetch(`http://10.0.0.112:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={ hangleGoBack }>
          <Entypo
            name="chevron-thin-left"
            color={THEME.COLORS.CAPTION_300}
            size={20}
          />
        </TouchableOpacity>
        <Image
          source={logoImg}
          style={styles.logo}
        />
        <View style={styles.right}/>
      </View>
      <Image 
        source={{ uri: game.bannerUrl }}
        style={styles.cover}
        resizeMode='cover'
      />

      <Heading 
        title={ game.title }
        subtitle='Conecte-se e comece a jogar!'
      />

      <FlatList
        style={styles.containerList}
        data={duos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DuoCard
            data={item}
            onConnect={() => getDiscordUser(item.id)}
          />
        )}
        horizontal
        contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={ () => (
          <Text style={styles.emptyListText}>
            Não há anúncios publicados para esse jogo!
          </Text>
        )}
      />
      <DuoMatch
        visible={discordSelected.length > 0}
        discord={discordSelected}
        onClose={ () => setDiscordSelected('')}
      >

      </DuoMatch>
      </SafeAreaView>
    </Background>
  );
}