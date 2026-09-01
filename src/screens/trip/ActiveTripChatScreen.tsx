import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Platform,  KeyboardAvoidingView, FlatList } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { mockChatMessages, chatLabels } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { ChatBubble } from '../../components/molecules/ChatBubble';
import { ChatImageBubble } from '../../components/molecules/ChatImageBubble';
import type { ChatMessage } from '../../types/chat';
import type { HomeScreenProps } from '../../types/navigation';

/**
 * ActiveTripChatScreen
 * In-trip chat with dispatcher / support.
 */
export interface ActiveTripChatScreenProps {
  readonly navigation: HomeScreenProps<'ActiveTripChat'>['navigation'];
  readonly route: HomeScreenProps<'ActiveTripChat'>['route'];
  readonly testID?: string;
}

export const ActiveTripChatScreen: React.FC<ActiveTripChatScreenProps> = ({
  navigation,
  route,
  testID,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([...mockChatMessages]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = useCallback(() => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'driver',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending',
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    // Mock: update to 'sent' after delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMsg.id ? { ...m, status: 'sent' as const } : m)),
      );
    }, 800);
  }, [inputText]);

  const mapImageStatus = (status: ChatMessage['status']): 'uploading' | 'sent' | 'failed' => {
    if (status === 'sending') return 'uploading';
    if (status === 'error') return 'failed';
    return 'sent';
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    if (item.imageUrl) {
      return (
        <ChatImageBubble
          imageUrl={item.imageUrl}
          timestamp={item.timestamp}
          isDriver={item.sender === 'driver'}
          status={mapImageStatus(item.status)}
        />
      );
    }
    return (
      <ChatBubble
        text={item.text ?? ''}
        timestamp={item.timestamp}
        sender={item.sender === 'driver' ? 'driver' : 'other'}
        status={item.status === 'error' ? 'failed' : item.status}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader
        title={chatLabels.title}
        onBackPress={() => navigation.goBack()}
        showBackButton
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder={chatLabels.inputPlaceholder}
            placeholderTextColor={colors.outline}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <Pressable
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
            accessibilityRole="button"
            accessibilityLabel={chatLabels.sendLabel}
          >
            <Text style={[styles.sendIcon, !inputText.trim() && styles.sendIconDisabled]}>
              send
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  container: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.gutter,
    gap: spacing.xs,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.gutter,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.gutter,
    ...typography.bodyMd,
    color: colors.onSurface,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  sendIcon: {
    fontSize: 20,
    color: colors.onPrimary,
  },
  sendIconDisabled: {
    color: colors.outline,
  },
});

export default ActiveTripChatScreen;