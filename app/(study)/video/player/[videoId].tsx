// app/(study)/video/player/[videoId].tsx
import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import VideoControls from '@/components/study/video/VideoControls';

const SAMPLE_VIDEO_URL = 'https://sample-video-ft.s3.ap-northeast-1.amazonaws.com/file_example_MP4_480_1_5MG.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXVHWLCQLOVR56HON%2F20241118%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20241118T064235Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0xIkgwRgIhAIchhfUlVSx%2BCG0daVDd6Ygpf8tUqT19GzMn9vgnhtiWAiEAhDloEqwYzTaCqwwvUOsresEscOZOsNHxivpx1cyNkQAqjQMIWBACGgw1MjY2NTAxMTkxOTAiDITF%2FRSvOz9olLSB5SrqAofw%2Bvs%2F%2Bi9qC8o%2B3Yk%2Fm3Dy2OZFgPsJFN98f3uXd9KMftAtw9Eqdnf6dQXSSwW3ahz1Szghs1EzyfJFq%2Bz8Oshh1Sg7eeP8Z2hN3yxD2ekfcMaq6tGJhBsoUpr7BPdFWshsKjs8E7XLaxepTcGgfnBGgPJ1dbj%2Fx4Jf%2Fq5JMjBBwT%2BB3%2FRbxNnu4G7wWIaOkKIVvsX6FPcqOzQT9hlhuKhviMxD3BuR%2Fb%2B2ktIOngAHloBGF6uJHBj33SMMjQE9Cn1NDhq4h4BJw7YCHwDd94CP%2F3CjPATDlz%2FNLd8xD04KrIeQxf6plEgvY92uX9Kxvql06QcHfVxBQL01%2FXjdOmdZONhotBxEKwOER5uLP%2Fok8yI5EH63j%2BKNC5rL3vpbbI0FIf367YHUPDzq2ABkFUP24a6sHUvf0dseSKYkWvCrVsUdtQCjqeHqVulF4ursTDwDkl9efGNvqckPBmrgIdYPdDSeKJi4FwRQMLrA67kGOrIC68AOFfbCrPdhQVJ91kbYL4orOwi%2BSy%2FoverXq%2B8qAAMr4tKHQrba%2FUaAGDQSaldeAr6XraLjw6ZIY5LGVU9oEhmiILc8tenbQ0c5B%2F5%2BfIXeD6z9UDFk%2F4f%2FSLGHiuf%2BeZQngao%2Baksk%2FbROJaS2w0nkgkQ1sHd7zzqnoPetGOE%2B4Nda6qXUsiSY3GQCjz%2B5OqgumrPxyKFD%2BXbWYiJWx5Dqfq4jym4PZwU07dSSlZfEnz0Rd%2BgeE6foh7TK91wyfbUyxhRo60OST0rNchqjxYEzoi0DMnG%2FtFE6O6ikGGT6EMRDozztjue%2BwBKdtke08QwjDggGUtUibowbGeB04NEbpTsOmPOL21hzaaJvat0%2BOv3iUYiz0alm03RVImf7mAnPP65PegKIn%2FzuptrbYq0%2B&X-Amz-Signature=93ce02893d8396090e3949588235700eba42d523558977b4e264a465920b9c55&X-Amz-SignedHeaders=host&response-content-disposition=inline';

export default function VideoPlayerScreen() {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const controlsTimeout = useRef<NodeJS.Timeout>();
  const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>();

  useEffect(() => {
    const setupOrientation = async () => {
      // 自動回転を有効にする
      await ScreenOrientation.unlockAsync();
      
      // 現在の向きを取得
      const currentOrientation = await ScreenOrientation.getOrientationAsync();
      setOrientation(currentOrientation);
      setIsFullscreen(isOrientationLandscape(currentOrientation));
    };

    setupOrientation();

    // 画面の向きの変更を監視
    const subscription = ScreenOrientation.addOrientationChangeListener((event) => {
      const newOrientation = event.orientationInfo.orientation;
      setOrientation(newOrientation);
      setIsFullscreen(isOrientationLandscape(newOrientation));
    });

    // クリーンアップ関数
    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      ScreenOrientation.removeOrientationChangeListener(subscription);
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  const isOrientationLandscape = (orientation?: ScreenOrientation.Orientation) => {
    return orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
           orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;
  };

  const hideControlsAnimation = () => {
    setIsControlsVisible(false);
    Animated.timing(controlsOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const showControlsAnimation = () => {
    setIsControlsVisible(true);
    Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(setupControlsTimeout);
  };

  const setupControlsTimeout = () => {
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    if (status.isPlaying) {
      controlsTimeout.current = setTimeout(hideControlsAnimation, 3000);
    }
  };

  const handleToggleControls = () => {
    if (!isControlsVisible) {
      showControlsAnimation();
    } else {
      hideControlsAnimation();
    }
  };

  const handlePlayPause = async () => {
    if (status.isPlaying) {
      await videoRef.current?.pauseAsync();
    } else {
      await videoRef.current?.playAsync();
    }
    showControlsAnimation();
  };

  const handleSeek = async (value: number) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(value);
    }
    setupControlsTimeout();
  };

  const handleSpeedChange = async () => {
    const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    
    if (videoRef.current) {
      await videoRef.current.setRateAsync(newSpeed, true);
      setPlaybackSpeed(newSpeed);
    }
    setupControlsTimeout();
  };

  const handleFullscreen = async () => {
    if (isFullscreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    setIsFullscreen(!isFullscreen);
    setupControlsTimeout();
  };

  const handleRewind = async () => {
    if (videoRef.current && status.positionMillis) {
      await videoRef.current.setPositionAsync(Math.max(0, status.positionMillis - 10000));
    }
    showControlsAnimation();
  };

  const handleForward = async () => {
    if (videoRef.current && status.positionMillis) {
      await videoRef.current.setPositionAsync(
        Math.min(status.durationMillis, status.positionMillis + 10000)
      );
    }
    showControlsAnimation();
  };

  const handleBack = async () => {
    if (isFullscreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      setIsFullscreen(false);
    } else {
      router.back();
    }
  };

  // 画面サイズに基づいてビデオコンテナのスタイルを計算
  const videoContainerStyle = [
    styles.videoContainer,
    isFullscreen && {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar hidden={isFullscreen} />
      <TouchableWithoutFeedback onPress={handleToggleControls}>
        <View style={videoContainerStyle}>
          <Video
            ref={videoRef}
            style={styles.video}
            source={{ uri: SAMPLE_VIDEO_URL }}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            isLooping={false}
            onPlaybackStatusUpdate={setStatus}
            useNativeControls={false}
            positionMillis={0}
            progressUpdateIntervalMillis={1000}
            onFullscreenUpdate={(event) => {
              // Handle fullscreen changes if needed
              console.log('Fullscreen update:', event);
            }}
          />
          
          {isControlsVisible && (
            <VideoControls
              isPlaying={status.isPlaying}
              playbackSpeed={playbackSpeed}
              progress={status.positionMillis || 0}
              duration={status.durationMillis || 0}
              isFullscreen={isFullscreen}
              opacity={controlsOpacity}
              title="宅建業法 第1章 第1節"
              onBack={handleBack}
              onPlayPause={handlePlayPause}
              onSeek={handleSeek}
              onSpeedChange={handleSpeedChange}
              onFullscreen={handleFullscreen}
              onRewind={handleRewind}
              onForward={handleForward}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});