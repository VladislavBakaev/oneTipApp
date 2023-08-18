import {
  DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList 
} from '@react-navigation/drawer';
import { BackgroundForMenus } from '../../../components/UI/Backgrounds';
import MainUserHeader from '../../../components/MainUserHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/AppStore';

function DrawerLeftMenuComponent(props: DrawerContentComponentProps) {
  const userData = useSelector((state: RootState) => state.user.user)

  return (
    <>
      <MainUserHeader
        firstName={userData?.firstName || ''}
        lastName={userData?.lastName || ''}
        id={userData?.id || 0}
        avaratSize={80}
      />
      <BackgroundForMenus
        style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30 }}
      >
        <DrawerContentScrollView {...props}
          style={{ backgroundColor: 'rgba(48, 48, 48, 0.57)', }}
        >
          <DrawerItemList {...props} />
        </DrawerContentScrollView>          
      </BackgroundForMenus>

    </>
  );
}

export default DrawerLeftMenuComponent