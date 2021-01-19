import {colors} from "./Colors";

export const Css = {
  staticWrapper: {
    width: '48%',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 17,
    height: 52
  },
  headerWithLine: {
    paddingVertical: 8,
    borderBottomColor: colors.white10,
    borderBottomWidth: 1
  },
  subTile: {
    fontSize: 12,
    lineHeight: 14,
    color: colors.white30
  },
  header: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 25
  },
  inactiveText: {
    fontSize: 13,
    fontWeight: 'normal',
    color: colors.white30,
    lineHeight: 18
  },
  loader: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white,
  },
  headerWrapper: {
    width: '100%',
    paddingVertical: 25,
  },
}
