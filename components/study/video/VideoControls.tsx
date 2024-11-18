import React, { useCallback } from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  Platform,
  Pressable,
} from 'react-native';
import Typography from '@/components/common/Typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { MaterialCommunityIcons as IconType } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { spacing } from '@/styles/spacing';

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

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface ControlButtonProps {
  icon: IconName;
  size?: number;
  onPress: () => void;
  style?: any;
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

  const formatTime = useCallback((milliseconds: number) => {
    if (!milliseconds) return '0:00';
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const ControlButton = useCallback(({ 
    icon, 
    size = 24, 
    onPress,
    style,
  }: ControlButtonProps) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.controlButton,
        pressed && styles.controlButtonPressed,
        style,
      ]}
      android_ripple={{
        color: 'rgba(255, 255, 255, 0.2)',
        borderless: true,
      }}
    >
      <MaterialCommunityIcons 
        name={icon}
        size={size} 
        color="#fff"
      />
    </Pressable>
  ), []);

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
        <ControlButton 
          icon={isFullscreen ? "chevron-down" : "chevron-left"}
          size={28}
          onPress={onBack}
          style={styles.backButton}
        />
        <Typography
          variant="body1"
          color="#fff"
          style={styles.title}
          numberOfLines={1}
        >
          {title}
        </Typography>
        <View style={styles.placeholder} />
      </View>

      {/* 中央コントロール */}
      <View style={styles.centerControls}>
        <ControlButton
          icon="rewind-10"
          size={36}
          onPress={onRewind}
        />

        <Pressable
          onPress={onPlayPause}
          style={({ pressed }) => [
            styles.playPauseButton,
            pressed && styles.playPauseButtonPressed,
          ]}
          android_ripple={{
            color: 'rgba(255, 255, 255, 0.3)',
            borderless: true,
          }}
        >
          <MaterialCommunityIcons
            name={isPlaying ? "pause" : "play"}
            size={44}
            color="#fff"
          />
        </Pressable>

        <ControlButton
          icon="fast-forward-10"
          size={36}
          onPress={onForward}
        />
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
            <Typography 
              variant="caption" 
              color="#fff"
              style={styles.timeText}
            >
              {formatTime(progress)}
            </Typography>
            <Typography 
              variant="caption" 
              color="#fff"
              style={styles.timeText}
            >
              {formatTime(duration)}
            </Typography>
          </View>
        </View>

        <View style={styles.controls}>
          <Pressable
            onPress={onSpeedChange}
            style={({ pressed }) => [
              styles.speedButton,
              pressed && styles.speedButtonPressed,
            ]}
          >
            <Typography 
              variant="button" 
              color="#fff"
              style={styles.speedText}
            >
              {playbackSpeed}x
            </Typography>
          </Pressable>

          <ControlButton
            icon={isFullscreen ? "fullscreen-exit" : "fullscreen"}
            onPress={onFullscreen}
          />
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backButton: {
    marginRight: spacing.sm,
  },
  title: {
    flex: 1,
    marginHorizontal: spacing.md,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  placeholder: {
    width: 44,
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl,
  },
  controlButton: {
    padding: spacing.sm,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  controlButtonPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  playPauseButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 44,
    padding: spacing.lg,
  },
  playPauseButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  bottomControls: {
    padding: spacing.md,
  },
  progressContainer: {
    marginBottom: spacing.sm,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  timeText: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: spacing.md,
  },
  speedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 16,
  },
  speedButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  speedText: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});