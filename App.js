import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import skills from './skills.json';

const AVATAR_URI =
  'https://media.licdn.com/dms/image/v2/D4D03AQGozBMkSFHfuA/profile-displayphoto-shrink_200_200/0/1699972919540?e=2147483647&v=beta&t=placeholder';

// Fallback solid-color avatar if image fails to load
const FALLBACK_COLOR = '#2D6A4F';

const levelEmoji = {
  beginner: '🌱',
  intermediate: '⚡',
  advanced: '🚀',
};

function SkillBadge({ skill, color, level }) {
  return (
    <View style={[styles.badge, { backgroundColor: color + '33', borderColor: color, borderWidth: 1.5 }]}>
      <Text style={[styles.badgeText, { color: '#111' }]}>
        {levelEmoji[level] ?? ''} {skill}
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />

      {/* Card */}
      <View style={styles.card}>

        {/* Top accent bar */}
        <View style={styles.accentBar} />

        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/300?img=47' }}
            style={styles.avatar}
          />
        </View>

        {/* Name & title */}
        <Text style={styles.name}>Amna Željo</Text>
        <Text style={styles.title}>Chief Data Officer · CS Student</Text>
        <Text style={styles.location}>📍 Sarajevo, Bosnia & Herzegovina</Text>

        <View style={styles.divider} />

        {/* Bio */}
        <Text style={styles.bio}>
          Computer Science student at SSST & Buckingham University, currently
          serving as Chief Data Officer at NH Master d.o.o. and AWS Cloud
          intern at Bloomteq. Passionate about data engineering, machine
          learning, and building intelligent full-stack solutions. Valedictorian
          — Class of 2022.
        </Text>

        <View style={styles.divider} />

        {/* Skills heading */}
        <Text style={styles.sectionHeading}>Skills</Text>

        {/* Skills */}
        <View style={styles.skillsContainer}>
          {skills.map((item) => (
            <SkillBadge
              key={item.skill}
              skill={item.skill}
              color={item.color}
              level={item.level}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 420,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
    overflow: 'hidden',
    alignItems: 'center',
  },
  accentBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#2D6A4F',
    marginBottom: 24,
  },
  avatarWrapper: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 3,
    borderColor: '#2D6A4F',
    overflow: 'hidden',
    marginBottom: 14,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  title: {
    fontSize: 13,
    color: '#2D6A4F',
    fontWeight: '600',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  divider: {
    width: '88%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  bio: {
    fontSize: 13.5,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 20,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    width: '100%',
  },
  badge: {
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
});
