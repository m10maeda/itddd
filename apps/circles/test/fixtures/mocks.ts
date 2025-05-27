import { CircleData } from '../../src/application/use-case/input-ports';
import {
  CircleAddedMember,
  CircleId,
  CircleName,
  CircleRegistered,
} from '../../src/domain/models/circle';
import { Member, MemberId } from '../../src/domain/models/member';

export const circleEvents = [
  new CircleRegistered(
    new CircleId('0'),
    new CircleName('Baseball'),
    new MemberId('0'),
  ),
  new CircleAddedMember(new CircleId('0'), new MemberId('1')),
  new CircleAddedMember(new CircleId('0'), new MemberId('3')),
  new CircleRegistered(
    new CircleId('1'),
    new CircleName('Football'),
    new MemberId('2'),
  ),
  new CircleAddedMember(new CircleId('1'), new MemberId('3')),
];

export const circles = [
  new CircleData('0', 'Baseball', '0', ['1', '3']),
  new CircleData('1', 'Football', '2', ['3']),
];

export const members = [
  new Member(new MemberId('0')),
  new Member(new MemberId('1')),
  new Member(new MemberId('2')),
  new Member(new MemberId('3')),
  new Member(new MemberId('4')),
];
