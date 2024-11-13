// constants/graph/dimensions.ts
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const horizontalPadding = 32; // 左右のパディング (16 * 2)
const graphContainerPadding = 32; // グラフコンテナのパディング (16 * 2)

export const GRAPH_WIDTH = screenWidth - horizontalPadding - graphContainerPadding;
export const GRAPH_HEIGHT = GRAPH_WIDTH * 0.5;
export const PADDING = GRAPH_WIDTH * 0.05;