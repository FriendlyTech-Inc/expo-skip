// components/study/video/VideoControls.tsx
import { View, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

interface VideoControlsProps {
  isPlaying: boolean;
  playbackSpeed: number;
  progress: number;
  duration: number;
  isFullscreen: boolean;
  opacity: Animated.Value;
  title: string;
  onBack: () => void;
  onPlayPause: () => void;
  onSeek: (value: number) => void;
  onSpeedChange: () => void;
  onFullscreen: () => void;
  onRewind: () => void;
  onForward: () => void;
}

export default function VideoControls({
  isPlaying,
  playbackSpeed,
  progress,
  duration,
  isFullscreen,
  opacity,
  title,
  onBack,
  onPlayPause,
  onSeek,
  onSpeedChange,
  onFullscreen,
  onRewind,
  onForward,
}: VideoControlsProps) {
  const insets = useSafeAreaInsets();
  
  const formatTime = (milliseconds: number) => {
    if (!milliseconds) return '0:00';
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { opacity },
        Platform.OS === 'ios' && {
          paddingTop: isFullscreen ? insets.top : 0,
          paddingBottom: isFullscreen ? insets.bottom : 0,
        }
      ]}
    >
      {/* 上部コントロール */}
      <View style={[
        styles.topControls,
        { paddingTop: isFullscreen ? 0 : insets.top }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons 
            name={isFullscreen ? "chevron-down" : "chevron-left"} 
            size={28} 
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 中央コントロール */}
      <View style={styles.centerControls}>
        <TouchableOpacity
          onPress={onRewind}
          style={styles.controlButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons name="rewind-10" size={36} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPlayPause}
          style={styles.playPauseButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons
            name={isPlaying ? "pause" : "play"}
            size={44}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onForward}
          style={styles.controlButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons name="fast-forward-10" size={36} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 下部コントロール */}
      <View style={[
        styles.bottomControls,
        Platform.OS === 'ios' && {
          paddingBottom: isFullscreen ? 0 : insets.bottom
        }
      ]}>
        <View style={styles.progressContainer}>
          <Slider
            style={styles.slider}
            value={progress}
            minimumValue={0}
            maximumValue={duration || 1}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
            thumbTintColor={Colors.primary}
            onSlidingComplete={onSeek}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(progress)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            onPress={onSpeedChange}
            style={styles.speedButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.speedText}>{playbackSpeed}x</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onFullscreen}
            style={styles.controlButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialCommunityIcons
              name={isFullscreen ? "fullscreen-exit" : "fullscreen"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    textAlign: 'center',
  },
  placeholder: {
    width: 44,
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 48,
  },
  controlButton: {
    padding: 8,
  },
  playPauseButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 44,
    padding: 22,
  },
  bottomControls: {
    padding: 16,
  },
  progressContainer: {
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
    paddingHorizontal: 4,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
  },
  speedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  speedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});