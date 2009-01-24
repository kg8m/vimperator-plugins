var PLUGIN_INFO =
<VimperatorPlugin>
  <name>Foxy Tunes</name>
  <description>for FoxyTunes</description>
  <description lang="ja">for FoxyTunes</description>
  <version>0.3</version>
  <author mail="anekos@snca.net" homepage="http://d.hatena.ne.jp/nokturnalmortum/">anekos</author>
  <minVersion>2.0pre</minVersion>
  <maxVersion>2.0pre</maxVersion>
  <updateURL>http://svn.coderepos.org/share/lang/javascript/vimperator-plugins/trunk/foxytunes.js</updateURL>
  <license document="http://creativecommons.org/licenses/by-sa/3.0/">
    Creative Commons Attribution-Share Alike 3.0 Unported
  </license>
  <detail><![CDATA[
    == Commands ==
    +:ftplay
    +:ftpause
    +:ftnext
    +:ftprevious
    +:ftvolume <VOLUME>
  ]]></detail>
  <detail lang="ja"><![CDATA[
    == Commands ==
    +:ftplay
    +:ftpause
    +:ftnext
    +:ftprevious
    +:ftvolume <VOLUME>
  ]]></detail>
</VimperatorPlugin>;

(function () {

  // 上手い具合に病数に直すよ
  function fromTimeCode (code) {
    let m;
    function sign (s, v)
      (s == '-' ? -v : v);
    if (m = code.match(/^([-+])?(\d+):(\d+)$/))
      return sign(m[1], parseInt(m[2]) * 60 + parseInt(m[3]));
    if (m = code.match(/^([-+])?(\d+\.\d+)$/))
      return sign(m[1], parseFloat(m[2]) * 60);
    return parseInt(code);
  }

  let player = Components.classes['@foxytunes.org/FoxyTunesEngine/FoxyTunesService;1'].getService();

  // foxytunesDispatchPlayerCommand
  ['Pause', 'Play', 'Next', 'Previous'].forEach(function (name) {
    let ln = name.toLowerCase();
    let lnm = ln.match(/(..)(.*)/);
    commands.addUserCommand(
      ['ft' + lnm[1] + '[' + lnm[2] + ']'],
      name + ' - FoxyTunes',
      function () foxytunesDispatchPlayerCommand(name, true),
      true
    );
  });

  // volume
  commands.addUserCommand(
    ['ftvo[lume]'],
    'Set Volume - FoxyTunes',
    function (args) {
      let v = parseInt(args.string || '0', 10);
      let volume = args.bang ? Math.min(Math.max(foxytunesGetVolume() + v, 0), 100)
                             : Math.min(Math.max(v, 0), 100);
      foxytunesSetVolume(v);
    },
    {
      argCount: '*'
    },
    true
  );


})();

/*
  FoxyTunes が window に設置する関数の数々…
  gFoxytunesYMPPageAnalyzer
  FoxyTunesHTMLTooltip
  FoxyTunesTooltipInfo
  FoxytunesYMPPageAnalyzer
  FoxytunesThunderbirdSignatures
  FoxytunesSignatures
  FoxytunesSignaturesSiteHandler
  FoxyTunesFeedMenuPopupUI
  FoxyTunesSearchEngine
  FoxyTunesSearchTermsBuilder
  FoxyTunesSearchExecuter
  foxytunescontextMenuExecuteSearch
  foxytunesExecuteSearch
  foxytunesInitMusicSearchMenuPopup
  gFoxytunesSignatures
  gFoxyTunesUninstallObserver
  gbFoxyTunesIgnorePrefChange
  gFoxyTunesRecentPlayers
  gFoxyTunesInfoBoxShowTimerId
  gFoxyTunesInfoBoxHideTimerId
  gFoxyTunesInfoBoxWindow
  gbFoxyTunesInfoBoxWindowOpened
  gbFoxyTunesInfoPopupVisible
  gFoxyTunesDOMParser
  gbFoxyTunesShiftDown
  gbFoxyTunesNoTitlePopup
  gFoxyTunesUpdateTitleOnCommandTimerID
  gbFoxyTunesDontUpdateTitleOnCommand
  gFoxyTunesMaxLinksForWebMedia
  gFoxyTunesAutoHideTimeout
  gFoxyTunesAllButtonsAutohideTimerID
  gFoxyTunesCurrentTrackTitle
  gFoxyTunesTrackInfoTooltipHeight
  gFoxyTunesPlayerObj
  gFoxyTunesCurrentPlayerClass
  gFoxyTunesInsertAfterElementId
  gFoxyTunesInsertBeforeElementId
  gFoxyTunesParentElementID
  gbFoxyTunesOpenWindowInTab
  gFoxyTunesCurrentPlayerOptions
  gFoxyTunesCustomPlayerOptions
  gFoxyTunesMaxRecentCharsets
  gFoxyTunesRecentCharsets
  gFoxyTunesAllCharSets
  gbFoxyTunesChangingSliderPos
  gbFoxyTunesPlaying
  gFoxyTunesTrackInfoTimerID
  gFoxyTunesCharacterEncoding
  gFoxytunesUtils
  gFoxyTunesUnicodeConverter
  foxytunesScriptableUnicodeConverter
  gFoxyTunesPref
  gFoxyTunesPrefService
  foxytunesDragAndDropObserver
  foxytunesGenarateUrlsFromUrl
  foxytunesGenarateUrlsFromFileOrDirectory
  foxytunesSetAmazonStoreOption
  foxytunesSetAmazonStore
  foxytunesInstallTwittyTunes
  foxytunesOpenTwittyTunesDialog
  foxytunesUninitOverlay
  foxytunesInitOverlay
  foxytunesShowStatusBarUponFreshInstall
  foxytunesUninstallObserver
  foxytunesUpdateFoxytunesVersionAndShowWelcomeScreenIfNeeded
  foxytunesClearQuickSwitch
  foxytunesCustomizeWebSearchEngine
  foxytunesInitMinibrowserOverlay
  foxytunesObserveContextMenu
  foxytunesObserveSwitchPlayer
  gFoxyTunesSwitchPlayerObserver
  foxytunesObserveTrackData
  foxytunesObservePrefs
  gFoxyTunesPreferencesObserver
  gFoxyTunesTrackDataObserver
  foxytunesDoPlatformSpecificUIChanges
  foxytunesDisableFoxyTunesMini
  foxytunesShowPleaseWait
  foxytunesModuleInstallationFailed
  foxytunesSeaMonkeyInstallFixer
  foxytunesOnQuickPlayerSwitch
  foxytunesPopulateRecentPlayers
  foxytunesOnMainMenuShowing
  foxytunesAlertStreamNotSupported
  foxytunesStreamIsSupportedInCurrentPlayer
  foxytunesGetSupportedRegExp
  foxytunesURLIsMedia
  foxytunesOnContextPopupShowing
  foxytunesShowOrHideContextMenuItems
  foxytunesSetElementHiddenAttrByFtpref
  foxytunesPopulateFeedMenu
  foxytunesPopulatePageMediaMenu
  foxytunesGetLinkDescription
  foxytunesPlayMedia
  foxytunesOpenMinimode
  foxytunesOnMouseMove
  foxytunesOnBrowserStatusChanged
  foxytunesVerifyWidth
  foxytunesRestoreIfHidden
  foxytunesShowRestartBrowserAlert
  foxytunesEmusicSpecificInit
  foxytunesSeaMonkeySpecificInit
  foxytunesThunderbirdSpecificInit
  foxytunesRenameMainDll
  foxytunesShowUpdateAvailableButtonIfNeeded
  foxytunesUpdateAvailableButtonIsDisabled
  foxytunesDisableUpdateAvailableButton
  foxytunesGotoUpdateURL
  foxytunesFoxyTunesHasUpdates
  foxytunesGetFoxyTunesAvailableUpdateVersion
  foxytunesGetFoxyTunesVersion
  foxytunesGetFoxyTunesEMItem
  foxytunesInstallPlatformSpecificLibraryIfNeeded
  foxytunesRemoveRegistryFiles
  foxytunesGetComponentFile
  foxytunesGetHome
  foxytunesGetProfileDir
  foxytunesInsertPlayersMenuItem
  foxytunesInitVolumeSlider
  foxytunesRegisterVolumeSliderEvents
  foxytunesRegisterGlobalScrollEvent
  foxytunesSetPlayerOptionsCustom
  foxytunesSetPlayerOptionsPreset
  foxytunesSetPlayerOptions
  foxytunesDoPlayerSpecificUIChanges
  foxytunesSubscribeToNewsletter
  foxytunesOpenConfigureShortcutsDialog
  foxytunesInitKeyboardShortcuts
  foxytunesOverrideKeyIfNeeded
  foxytunesGetAllKeys
  foxytunesOpenFoxyTunesAboutDialog
  foxytunesToggleAllButtonsVisibility
  foxytunesAllButtonsMouseOut
  foxytunesAllButtonsMouseOver
  foxytunesAllButtonsAutoHideIsOn
  foxytunesToggleVolumeSliderVisibility
  foxytunesToggleButtonVisibility
  foxytunesToggleSeparatorsVisibility
  foxytunesToggleOpenWindowInTab
  foxytunesToggleURLUnescapeTitle
  foxytunesToggleObjectVisibilityWithArrow
  foxytunesScrollOnVolumeControls
  foxytunesDecreaseVolume
  foxytunesIncreaseVolume
  foxytunesRefreshVolumeSliderIfDirty
  foxytunesRefreshVolumeSliderPosition
  foxytunesVolumeSliderPositionDirty
  foxytunesSetVolumeSliderPosition
  foxytunesVolumeSliderChanged
  foxytunesEndTrackInfoTooltip
  foxytunesStartTrackInfoTooltip
  foxytunesHideTrackInfoPopup
  foxytunesShowTrackInfoPopup
  foxytunesTriggerShowTrackInfoPopup
  foxytunesCancelShowTrackInfoPopup
  foxytunesHideTrackInfoBox
  foxytunesTriggerHideTrackInfoBox
  foxytunesCancelHideTrackInfoBox
  foxytunesShowTrackInfoBox
  foxytunesHideAllPopups
  foxytunesHideAllPopupsByType
  foxytunesSetTrackInfoTooltip
  foxytunesGetTrackInfoTooltipText
  foxytunesSetCurrentTrackPosition
  foxytunesUpdatePlanetTooltip
  foxytunesGetCurrentTrackItem
  foxytunesGetCurrentTrackTitle
  foxytunesGetCurrentTrackData
  foxytunesGetVolume
  foxytunesSetVolume
  foxytunesVerifyWMPStartPlaying
  foxytunesDispatchPlayerCommand
  foxytunesUpdateTrackTitleAfterCommand
  foxytunesInitPlayerObjectIfNeeded
  foxytunesSelectPlayer
  foxytunesUpdateRecentPlayer
  foxytunesOnSelectPlayer
  foxytunesReadPreferences
  foxytunesWritePreferences
  foxytunesUpdateRecentCharsetsList
  foxytunesSelectCharset
  foxytunesPopulateRecentCharsets
  foxytunesAddRecentCharSet
  foxytunesTrimRecentCharSets
  foxytunesGetCharSetMenuItem
  foxytunesPopulatePlayers
  foxytunesConfigureCurrentPlayer
  foxytunesOnPlayerListShowing
  foxytunesPopulateCharacterEncodings
  foxytunesCompareCharSets
  gFoxyTunesTimeTools
  FoxyTunesTimeTools
  gFoxyTunesTrackInfoDisplayAutohideTimerID
  gFoxyTunesResizeInitialWidth
  gFoxyTunesResizeStartX
  gbFoxyTunesTrackPressing
  gFoxyTunesTrackTitleQueryInterval
  gFoxyTunesTrackTitleDisplayTimerID
  foxytunesTrackTitleDragStartObserver
  foxytunesTrackTitleDisplayResizeMove
  foxytunesTrackTitleDisplayResizeUp
  foxytunesTrackTitleDisplayResizeDown
  foxytunesTrackTitleToggleAlignment
  foxytunesTrackTitleHideGotoPlanetButton
  foxytunesTrackToggleSeekSlider
  foxytunesTrackTitleToggleScrolling
  foxytunesTrackTitleCopyToClipBoard
  foxytunesToggleTrackTitleDisplayVisibility
  foxytunesTrackTitleAutoHideIsOn
  foxytunesTrackInfoDisplayMouseOut
  foxytunesTrackInfoDisplayMouseOver
  foxytunesTrackTitleDisplayVisibile
  foxytunesSetCurrentTrackTitleLabel
  foxytunesTrackTitleLabelUpdater
  foxytunesUpdateTrackPositionMarker
  foxytunesUpdateTrackTitleLabel
  foxytunesInitTrackTitleLabel
  foxytunesGetTrackInfoLabelElement
  gFoxyTunesCurrentDropTarget
  foxytunesSetFoxyTunesPosition
  foxytunesRenameTagName
  foxyTargetObserver
  foxyDragStartObserver
  foxytunesOnTargetDragDrop
  foxytunesOnTargetDragExit
  foxytunesOnTargetDragOver
  foxytunesSetDropTargetMarker
  foxytunesElementIsToolbarOrStatusbar
  foxytunesRemoveDropClass
  foxytunesHasDropClass
  foxytunesUnInstallDragDropObservers
  foxytunesInstallDragDropObservers
  foxytunesInstallUninstallDragDropObservers
  foxytunesInstallDragDropObserversForElementById
  foxytunesInclude
  gFoxyTunesIncludeRegistry
  foxytunesGetExtensionVersion
  foxytunesOpenSignatuensConfigurationWindow
  foxytunesGetLocaleStringExternalfunction
  foxytunesGetDefaultPlayerForOs
  foxytunesMd5
  foxytunesGetIconPath
  foxytunesGetExtensionPath
  foxytunesEscapeNonAsciiText
  foxytunesPrefToUIElements
  foxytunesUIElementToPref
  gFoxytunesPreferenceManager
  foxytunesPreferenceManager
  foxytunesShowBalloonHelpWithTip
  foxytunesShowBalloonHelp
  foxytunesGetMostRecentWindow
  foxytunesGetBaseWindow
  foxytunesFixLocalStore
  foxytunesDoAndHidePleaseWait
  foxytunesGetAppName
  foxytunesGetAppVersion
  foxytunesGetPlatform
  foxytunesGetPlatformFull
  foxytunesGetDefaultBrowserIcon
  foxytunesGetDefaultBrowserLocation
  foxytunesReadRegistryValue
  foxytunesInitMenupopups
  foxytunesCloseLastContextMenu
  gFoxyTunesLastMenu
  foxytunesSeconds2TimeStr
  foxytunesIsNumber
  foxytunesTryGetFoxyTunesPlayerFromContractID
  foxytunesGetPlayerShortNameFromContractID
  foxytunesIsInMinimode
  foxytunesWindowIsMinimode
  foxytunesWindowIsMinibrowser
  foxytunesClearMenupopup
  foxytunesSanitizeURL
  foxytunesGetClippedText
  foxytunesGetSelection
  foxytunesGetTextFromClipboard
  foxytinesTrimString
  foxytunesShortcutsEnabledByDefault
  foxytunesReadSinglePreference
  foxytunesReadSingleUnicharPreference
  foxytunesWriteSingleUnicharPreference
  foxytunesWriteSinglePreference
  foxytunesGetLocaleString
  foxytunesStringPadRight
  foxytunesShowPrompt
  foxytunesShowAlert
  foxytunesShowAlertWithDelay
  foxytunesOpenInTabs
  foxytunesGoToURL
  foxytunesEmusicGoToUrl
  foxytunesShouldOpenWindowsInTabs
  foxytunesGetEmusicWindow
  foxytunesGetBrowserWindow
  foxytunesRaiseBrowserWindow
  foxytunesGotoPlanet
  foxytunesGetPlanetUrl
  foxytunesOpenBrowserWindow
  gFoxyTunesSanitizer
  foxytunesSanitizer
  foxytunesGetMinibrowserURL
  foxytunesCalculateMinibrowserPosition
  foxytunesShouldUseMinibrowser
  foxytunesLaunchExternalURL
  foxytunesLaunchExternalURLFromThunderbird
  foxytunesAdjustStringForCorrectHost
  getFoxyTunesPlanetBaseURL
  foxytunesIsInEmusic
  foxytunesIsInMozilla
  foxytunesIsInThunderbird
  foxytunesIsInFirefox
  foxytunesIsInIceweasel
  foxytunesIsInMineField
*/

// vim:sw=2 ts=2 et si fdm=marker: