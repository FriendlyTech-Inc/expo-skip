// app/(tabs)/lms.tsx
import { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const LMS_URL = 'https://link-academy.study.jp/rpv/';

type VideoMode = 'lms' | 'native';

export default function LMSScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [videoMode, setVideoMode] = useState<VideoMode>('lms');
  const [isLandscape, setIsLandscape] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const [hasError, setHasError] = useState(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();
  const isMountedRef = useRef(true);

  // LMSモード用のJavaScript
  const LMS_JAVASCRIPT = `
    (function() {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'viewport');
      meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      document.getElementsByTagName('head')[0].appendChild(meta);

      const style = document.createElement('style');
      style.textContent = \`
        body {
          margin: 0;
          padding: 0;
          height: 100vh;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        }
        .video-container {
          position: relative;
          width: 100%;
          height: \${isLandscape ? '100vh' : 'auto'};
          overflow: hidden;
        }
        video {
          width: 100%;
          height: \${isLandscape ? '100%' : 'auto'};
          object-fit: contain;
        }
      \`;
      document.head.appendChild(style);

      // LMSモードでのビデオ設定
      const setupLMSVideo = () => {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          // LMSプレイヤーの設定を維持
          video.removeAttribute('webkit-playsinline');
          video.removeAttribute('playsinline');
          video.style.width = '100%';
          video.style.height = 'auto';
        });
      };

      // 初期設定
      setupLMSVideo();

      // DOMの変更を監視して新しく追加されたビデオ要素にも適用
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            setupLMSVideo();
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    })();
  `;

  // ネイティブモード用のJavaScript
  const NATIVE_JAVASCRIPT = `
    (function() {
      const setupNativeVideo = () => {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          // 既存の属性をクリア
          video.removeAttribute('webkit-playsinline');
          video.removeAttribute('playsinline');
          
          // ネイティブプレイヤー用の設定
          video.setAttribute('controls', 'true');
          video.style.maxWidth = '100%';
          video.style.height = 'auto';
          
          // イベントリスナーを一旦削除して再設定
          video.replaceWith(video.cloneNode(true));
          const newVideo = document.querySelector('video');
          
          if (newVideo) {
            newVideo.addEventListener('webkitbeginfullscreen', function() {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'fullscreen',
                action: 'enter'
              }));
            });
            
            newVideo.addEventListener('webkitendfullscreen', function() {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'fullscreen',
                action: 'exit'
              }));
            });

            // ビデオ要素をクリックしたときの処理
            newVideo.addEventListener('click', function() {
              try {
                if (this.requestFullscreen) {
                  this.requestFullscreen();
                } else if (this.webkitRequestFullscreen) {
                  this.webkitRequestFullscreen();
                } else if (this.webkitEnterFullscreen) {
                  this.webkitEnterFullscreen();
                }
              } catch (e) {
                console.error('Fullscreen request failed:', e);
              }
            });
          }
        });
      };

      // 初期設定
      setupNativeVideo();

      // DOMの変更を監視
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            setupNativeVideo();
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    })();
  `;

  // 画面の向きを監視・制御
  useEffect(() => {
    const handleOrientation = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      const isLandscapeMode = 
        orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;
      setIsLandscape(isLandscapeMode);
    };

    const subscription = ScreenOrientation.addOrientationChangeListener(() => {
      handleOrientation();
    });

    handleOrientation();

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  // WebViewからのメッセージを処理
  const handleMessage = async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'fullscreen') {
        if (data.action === 'enter') {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        } else if (data.action === 'exit') {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
      }
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  };

  // Androidのバックボタンハンドリング
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isLandscape) {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
          return true;
        }
        if (webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isLandscape])
  );

  // モード切り替えボタン
  const ModeToggle = () => (
    <View style={[
      styles.modeToggle,
      {
        marginTop: insets.top,
      }
    ]}>
      <TouchableOpacity
        style={[styles.modeButton, videoMode === 'lms' && styles.activeMode]}
        onPress={() => setVideoMode('lms')}
      >
        <MaterialCommunityIcons
          name="play-network"
          size={20}
          color={videoMode === 'lms' ? Colors.primary : Colors.subText}
        />
        <Text style={[
          styles.modeText,
          { color: videoMode === 'lms' ? Colors.primary : Colors.subText }
        ]}>LMSプレイヤー</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.modeButton, videoMode === 'native' && styles.activeMode]}
        onPress={() => setVideoMode('native')}
      >
        <MaterialCommunityIcons
          name="phone-rotate-landscape"
          size={20}
          color={videoMode === 'native' ? Colors.primary : Colors.subText}
        />
        <Text style={[
          styles.modeText,
          { color: videoMode === 'native' ? Colors.primary : Colors.subText }
        ]}>ネイティブプレイヤー</Text>
      </TouchableOpacity>
    </View>
  );

  // コンポーネントのマウント管理
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // 新しいローディング関連の関数
  const startLoadingTimeout = useCallback(() => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    loadingTimeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        setIsLoading(false);
        setHasError(true);
      }
    }, 15000);
  }, []);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    startLoadingTimeout();
  }, [startLoadingTimeout]);

  const handleLoadEnd = useCallback(() => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    if (isMountedRef.current) {
      setIsLoading(false);
    }
  }, []);

  const handleError = useCallback(() => {
    if (isMountedRef.current) {
      setIsLoading(false);
      setHasError(true);
    }
  }, []);

  const handleReload = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  }, []);

  return (
    <View style={[
      styles.container,
      isLandscape && styles.landscapeContainer
    ]}>
      <StatusBar style="light" hidden={isLandscape} />
      {!isLandscape && <ModeToggle />}
      <WebView
        ref={webViewRef}
        source={{ uri: LMS_URL }}
        style={[
          styles.webview,
          {
            marginBottom: isLandscape ? 0 : tabBarHeight,
          }
        ]}
        injectedJavaScript={videoMode === 'lms' ? LMS_JAVASCRIPT : NATIVE_JAVASCRIPT}
        onMessage={handleMessage}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        renderError={(errorDomain, errorCode, errorDesc) => (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              ページの読み込みに失敗しました
            </Text>
            <TouchableOpacity
              style={styles.reloadButton}
              onPress={handleReload}
            >
              <MaterialCommunityIcons name="reload" size={24} color={Colors.primary} />
              <Text style={styles.reloadText}>再読み込み</Text>
            </TouchableOpacity>
          </View>
        )}
        allowsFullscreenVideo={videoMode === 'native'}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={videoMode === 'lms'}
        scrollEnabled={true}
        bounces={!isLandscape}
        automaticallyAdjustContentInsets={false}
        contentInset={{
          top: 0,
          bottom: isLandscape ? 0 : tabBarHeight,
          left: 0,
          right: 0
        }}
        scalesPageToFit={Platform.OS === 'android'}
        key={videoMode}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  landscapeContainer: {
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  modeToggle: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    zIndex: 1,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeMode: {
    backgroundColor: '#f0f0f0',
  },
  modeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 16,
  },
  reloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  reloadText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.primary,
  },
});