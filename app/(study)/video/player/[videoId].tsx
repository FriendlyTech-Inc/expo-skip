// app/(study)/video/player/[videoId].tsx
import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import VideoControls from '@/components/study/video/VideoControls';

const SAMPLE_VIDEO_URL = 'https://sample-video-ft.s3.ap-northeast-1.amazonaws.com/%E2%89%AA5%E5%88%86%E3%81%A6%E3%82%99%E3%82%8F%E3%81%8B%E3%82%8B%EF%BC%81%E2%89%AB%E5%8F%96%E5%BE%97%E3%81%8B%E3%82%99%E5%BD%93%E3%81%9F%E3%82%8A%E5%89%8D%E3%81%AE%E6%99%82%E4%BB%A3%E3%81%AB%EF%BC%81%EF%BC%88IT%E3%83%8F%E3%82%9A%E3%82%B9%E3%83%9B%E3%82%9A%E3%83%BC%E3%83%88%E8%AC%9B%E5%BA%A7%EF%BC%89.mp4';

export default function VideoPlayerScreen() {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
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

    // コントロールを最初は非表示にする
    hideControlsAnimation();

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

  useEffect(() => {
    const setupAudioVideo = async () => {
      try {
        // Audio.setAudioModeAsyncを使用
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false
        });
      } catch (error) {
        console.error('Failed to set audio mode:', error);
      }
    };

    setupAudioVideo();
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
    if (isControlsVisible) {
      hideControlsAnimation();
    } else {
      showControlsAnimation();
    }
  };

  const handlePlayPause = async () => {
    if (status.isPlaying) {
      await videoRef.current?.pauseAsync();
    } else {
      await videoRef.current?.playAsync();
    }
    // 再生/一時停止時にコントロールを表示したままにする
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
            volume={1.0}  // 音量を設定（0.0 〜 1.0）
            isMuted={false}  // ミュートしない
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