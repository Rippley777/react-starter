import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { toggleTheme } from '../../../store/reducers/theme';

export const ThemeSwitcher = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleTheme())}>
      {theme === 'light' ? '🌚' : '🌞'}
    </button>
  );
};
